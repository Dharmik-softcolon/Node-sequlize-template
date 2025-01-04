import config from '../config/config'
import responseMessage, { HTTP_STATUSES } from '../constant/responseMessage'
import Employee from '../model/employee' // Adjust the path to your model
import { verifyAccessToken } from '../util/auth'
import globalHandler from '../util/globalHandler'
import httpResponse from '../util/httpResponse'
import logger from '../util/logger'

import type { NextFunction, Request, Response } from 'express'

export const isEmployee = globalHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the header
    const headerToken = req.headers[config.TOKEN_HEADER_NAME] as string | undefined
    const token = headerToken?.startsWith('Bearer') ? headerToken.split(' ')[1] : undefined

    if (!token) {
        logger.warn('Token is missing or invalid')
        return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)
    }

    // Verify the token
    const tokenInfo = await verifyAccessToken(token)

    if (!tokenInfo || typeof tokenInfo !== 'object' || !('id' in tokenInfo)) {
        logger.warn('Token verification failed or invalid token format')
        return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)
    }

    const { id } = tokenInfo as { id: string } // Ensure tokenInfo has `id`

    if (!id) {
        logger.warn('Token does not contain a valid employee ID')
        return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)
    }

    // Find the employee
    const employee = await Employee.findByPk(id)

    if (!employee) {
        logger.error(`User with ID ${id} does not exist in the Employee database`)
        return void httpResponse(req, res, HTTP_STATUSES.UNAUTHORIZED, responseMessage.UNAUTHORIZED_ERROR)
    }

    // Attach the employee ID to the request object
    req.employee = employee.id

    // Proceed to the next middleware
    return void next()
})
