const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("node_student_cbt", "root", "Pa55w0rd@1", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db