var express = require("express")
var router = express.Router()
const Test = require("../model/Test")

//Get All Tests
router.get("/tests", (req, res) => {
    Test.findAll()
        .then(tests => {
            res.json(tests)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add Tests
router.post("/addtest", (req, res) => {
    if(!req.body.test){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Test.create(req.body)
            .then(() => {
                res.send("Test Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Tests
router.delete("/deletetest/:id", (req, res) => {
    Test.destroy({
        where: {
            testid: req.params.id
        }
    })
        .then(() => {
            res.send("Test Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Parent Tests
router.put("/updatetest/:id", (req, res) => {
    if(!req.body.test) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Test.update(
            {test: req.body.test,
            status: req.body.status,
            instruction: req.body.instruction,
            parenttest: req.body.parenttest,
            parenttestid: req.body.parenttestid,
            numberofquestions: req.body.numberofquestions},
            {where: {
                testid: req.params.id
            }}
        )
            .then(() => {
                res.send("Test Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Tests By Parent Test ID
router.get("/selecttest/:id", (req, res) => {
    Test.findAll({
        where: {
            parenttestid: req.params.id
        }
    })
       .then(selecttest => {
            res.json(selecttest)
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