const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "questions",
    {
        questionid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        questiontype: {
            type: Sequelize.STRING
        },
        test: {
            type: Sequelize.STRING
        },
        testid: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,

      
    }
)