const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "studentanswers",
    {
        studentanswerid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentid: {
            type: Sequelize.INTEGER
        },
        testid: {
            type: Sequelize.INTEGER
        },
        questionid: {
            type: Sequelize.INTEGER
        },
        answerid: {
            type: Sequelize.INTEGER
        },
        score: {
            type: Sequelize.DOUBLE
        }
    },
    {
       timestamps: true,

        // I don't want createdAt
        createdAt: 'entrydate',
      
        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'entrydate'
      
    }
)