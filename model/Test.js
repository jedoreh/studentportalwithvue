const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "tests",
    {
        testid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        test: {
            type: Sequelize.STRING
        },
        instruction: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        parenttest: {
            type: Sequelize.STRING
        },
        parenttestid: {
            type: Sequelize.INTEGER
        },
        totaltime: {
            type: Sequelize.INTEGER
        },
        numberofquestions: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,

      
    }
)