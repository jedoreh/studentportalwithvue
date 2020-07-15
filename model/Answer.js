const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "answers",
    {
        answerid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        answer: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER
        },
        questionid: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,

      
    }
)