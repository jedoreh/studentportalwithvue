const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "studenttestsession",
    {
        studenttestsessionid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentid: {
            type: Sequelize.INTEGER
        },
        studentnumber: {
            type: Sequelize.STRING
        },
        matricnumber: {
            type: Sequelize.STRING
        },
        testid: {
            type: Sequelize.INTEGER
        },
        timeleft: {
            type: Sequelize.INTEGER
        },
        timecurrent: {
            type: Sequelize.STRING
        },
        questions: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.DOUBLE
        },
        status: {
            type: Sequelize.STRING
        },
        answeredquestions: {
            type: Sequelize.STRING
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