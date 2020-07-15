var express = require("express")
var router = express.Router()
const ParentTest = require("../model/ParentTest")

//Get All Parent Tests
router.get("/parenttests", (req, res) => {
    ParentTest.findAll()
        .then(parenttests => {
            res.json(parenttests)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add Parent Tests
router.post("/addparenttest", (req, res) => {
    if(!req.body.parenttest){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        ParentTest.create(req.body)
            .then(() => {
                res.send("Parent Test Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Parent Tests
router.delete("/deleteparenttest/:id", (req, res) => {
    ParentTest.destroy({
        where: {
            parenttestid: req.params.id
        }
    })
        .then(() => {
            res.send("Parent Test Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Parent Tests
router.put("/updateparenttest/:id", (req, res) => {
    if(!req.body.parenttest) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        ParentTest.update(
            {parenttest: req.body.parenttest,
            date: req.body.date,
            instruction: req.body.instruction},
            {where: {
                parenttestid: req.params.id
            }}
        )
            .then(() => {
                res.send("Parent Test Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Parent Tests
router.get("/selectparenttest/:id", (req, res) => {
    ParentTest.findOne({
        where: {
            parenttestid: req.params.id
        }
    })
       .then(parenttest => {
            res.json(parenttest)
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