import { DataTypes, Model, Sequelize } from 'sequelize'

import sequelize from './index'

import type { Optional } from 'sequelize'

export interface EmployeeAttributes {
    id: number
    name: string
    email: string
    position: string
    companyId: number
    createdAt?: Date
    updatedAt?: Date
}

export type EmployeeCreationAttributes = Optional<EmployeeAttributes, 'id' | 'createdAt' | 'updatedAt'>

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
    public id!: number
    public name!: string
    public email!: string
    public position!: string
    public companyId!: number
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'companies', // Table name
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        sequelize,
        tableName: 'employees',
        timestamps: true
    }
)

export default Employee
