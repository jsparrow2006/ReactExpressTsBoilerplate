import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize'
import sequelizeConnection from '../../config/db/dbConfig';

import { IUser } from './types/IUser';

export interface UserInput extends Optional<IUser, 'id'> {}
export interface UserOutput extends Required<IUser> {}

class User extends Model<IUser, UserInput> implements IUser {
    public id!: string
    public phoneNumber: string;
    public password: string;
    public firstname: string;
    public lastname: string;
    public avatar: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: true
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default User;