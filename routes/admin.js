var express = require("express")
var router = express.Router()
const Admin = require("../model/Admin")

//Get All Admin
router.get("/admins", (req, res) => {
    Admin.findAll()
        .then(admins => {
            res.json(admins)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add Admin
router.post("/addadmin", (req, res) => {
    if(!req.body.adminname && !req.body.username && !req.body.password){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Admin.create(req.body)
            .then(() => {
                res.send("Admin Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Admin
router.delete("/deleteadmin/:id", (req, res) => {
    Admin.destroy({
        where: {
            adminid: req.params.id
        }
    })
        .then(() => {
            res.send("Admin Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Admin
router.put("/updateadmin/:id", (req, res) => {
    if(!req.body.adminname) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Admin.update(
            {adminname: req.body.adminname,
            username: req.body.username,
            password: req.body.password,
            adminrole: req.body.adminrole},
            {where: {
                adminid: req.params.id
            }}
        )
            .then(() => {
                res.send("Admin Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Admin
router.get("/selectadmin/:id", (req, res) => {
    Admin.findOne({
        where: {
            adminid: req.params.id
        }
    })
       .then(selectadmin => {
            res.json(selectadmin)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Admin By username
router.get("/selectadminusername/:username", (req, res) => {
    Admin.findOne({
        where: {
            username: req.params.username
        }
    })
       .then(selectadminusername => {
            res.json(selectadminusername)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

/* //Select Parent Tests By  Parent Test Id
router.get("/selectanswerbyquestion/:id", (req, res) => {
    ParentTest.findAll({
        where: {
            questionid: req.params.id
        }
    })
       .then(answerbyquestion => {
            res.json(answerbyquestion)
        })
        .catch(err => {
            res.send("error: " + err)
        })
}) */

module.exports = router