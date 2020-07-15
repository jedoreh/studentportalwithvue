const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "parenttests",
    {
        parenttestid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parenttest: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        instruction: {
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