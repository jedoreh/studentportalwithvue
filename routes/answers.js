var express = require("express")
var router = express.Router()
const Answer = require("../model/Answer")

//Get All Answers
router.get("/answers", (req, res) => {
    Answer.findAll()
        .then(answers => {
            res.json(answers)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add Answer
router.post("/addanswer", (req, res) => {
    if(!req.body.answer){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Answer.create(req.body)
            .then(() => {
                res.send("Answer Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Answer
router.delete("/deleteanswer/:id", (req, res) => {
    Answer.destroy({
        where: {
            answerid: req.params.id
        }
    })
        .then(() => {
            res.send("Answer Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Answer
router.put("/updateanswer/:id", (req, res) => {
    if(!req.body.answer) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Answer.update(
            {answer: req.body.answer,
            image: req.body.image,
            score: req.body.score,
            questionid: req.body.questionid},
            {where: {
                answerid: req.params.id
            }}
        )
            .then(() => {
                res.send("Answer Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Answer
router.get("/selectanswer/:id", (req, res) => {
    Answer.findOne({
        where: {
            answerid: req.params.id
        }
    })
       .then(answer => {
            res.json(answer)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Answer By QuestionId
router.get("/selectanswerbyquestion/:id", (req, res) => {
    Answer.findAll({
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
})

module.exports = router