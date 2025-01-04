import { DataTypes, Model, Sequelize } from 'sequelize'

import sequelize from './index'

import type { Optional } from 'sequelize'

class Company extends Model {
    public id!: number
    public name!: string
    public location!: string
    public industry!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Company.init(
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
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'companies',
        timestamps: true
    }
)

export default Company


// ----------------- parraral code 

// import { DataTypes, Model, Sequelize } from 'sequelize'
// import sequelize from './index'

// import type { Optional } from 'sequelize'

// export interface CompanyAttributes {
//     id: number
//     name: string
//     location: string
//     industry: string
//     createdAt?: Date
//     updatedAt?: Date
// }

// export type CompanyCreationAttributes = Optional<CompanyAttributes, 'id' | 'createdAt' | 'updatedAt'>

// class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
//     public id!: number
//     public name!: string
//     public location!: string
//     public industry!: string
//     public readonly createdAt!: Date
//     public readonly updatedAt!: Date
// }

// Company.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         location: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         industry: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         createdAt: {
//             type: DataTypes.DATE,
//             defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//             type: DataTypes.DATE,
//             defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//     },
//     {
//         sequelize,
//         tableName: 'companies',
//         timestamps: true
//     }
// )

// export default Company
