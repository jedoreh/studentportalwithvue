var express = require("express")
var router = express.Router()
const Question = require("../model/Question")

//Get All Questions
router.get("/questions", (req, res) => {
    Question.findAll()
        .then(questions => {
            res.json(questions)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add question
router.post("/addquestion", (req, res) => {
    if(!req.body.question){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Question.create(req.body)
            .then(() => {
                res.send("Question Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Question
router.delete("/deletequestion/:id", (req, res) => {
    Question.destroy({
        where: {
            questionid: req.params.id
        }
    })
        .then(() => {
            res.send("Question Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Question
router.put("/updatequestion/:id", (req, res) => {
    if(!req.body.question) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Question.update(
            {question: req.body.question,
            image: req.body.image,
            questiontype: req.body.questiontype,
            test: req.body.test,
            testid: req.body.testid},
            {where: {
                questionid: req.params.id
            }}
        )
            .then(() => {
                res.send("Question Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Question
router.get("/selectquestion/:id", (req, res) => {
    Question.findOne({
        where: {
            questionid: req.params.id
        }
    })
       .then(question => {
            res.json(question)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Questions By Test ID
router.get("/selectquestionbytest/:id", (req, res) => {
    Question.findAll({
        where: {
            testid: req.params.id
        }
    })
       .then(selectquestion => {
            res.json(selectquestion)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

module.exports = router