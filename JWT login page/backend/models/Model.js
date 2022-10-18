import { Sequelize } from 'sequelize'
import db from '../config/Database.js'

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    username:{type: DataTypes.STRING},
    email:{type: DataTypes.STRING},
    password:{type: DataTypes.TEXT},
    refresh_token:{type: DataTypes.TEXT},
    role:{type:DataTypes.STRING},
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW')
    }
},{
    freezeTableName: true
})

export default Users;