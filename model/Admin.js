const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "admin",
    {
        adminid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        adminname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        adminrole: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)