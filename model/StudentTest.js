const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "studenttest",
    {
        studenttestid: {
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
        parenttestid: {
            type: Sequelize.INTEGER
        },
        parenttest: {
            type: Sequelize.STRING
        },
        cgpa: {
            type: Sequelize.DOUBLE
        },
        score: {
            type: Sequelize.DOUBLE
        },
        grade: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        faculty: {
            type: Sequelize.STRING
        },
        studentname: {
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