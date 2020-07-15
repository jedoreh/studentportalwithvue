const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "student",
    {
        studentid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentname: {
            type: Sequelize.STRING
        },
        matricnumber: {
            type: Sequelize.STRING
        },
        studentnumber: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.INTEGER
        },
        department: {
            type: Sequelize.STRING
        },
        faculty: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },
        courseofstudy: {
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