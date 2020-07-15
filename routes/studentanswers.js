var express = require("express")
var router = express.Router()
const StudentAnswer = require("../model/StudentAnswer")

//Get All Answers
router.get("/studentanswers", (req, res) => {
    StudentAnswer.findAll()
        .then(studentanswers => {
            res.json(studentanswers)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add Answer
router.post("/addstudentanswer", (req, res) => {
    if(!req.body.studentid){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        StudentAnswer.create(req.body)
            .then(() => {
                res.send("Student Answer Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Answer
router.delete("/deletestudentanswer/:id", (req, res) => {
    StudentAnswer.destroy({
        where: {
            studentanswerid: req.params.id
        }
    })
        .then(() => {
            res.send("Student Answer Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Delete Answer By Student Id and Answer Id
router.delete("/deletestudentanswerbystudentanswerid/:studentid/:answerid", (req, res) => {
    StudentAnswer.destroy({
        where: {
            studentid: req.params.studentid,
            answerid: req.params.answerid
        }
    })
        .then(() => {
            res.send("Student Answer Deleted By StudentId and AnswerId!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Student Answer
router.put("/updatestudentanswer/:id", (req, res) => {
    if(!req.body.answer) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        StudentAnswer.update(
            {answerid: req.body.answerid,
            studentid: req.body.studentid,
            score: req.body.score,
            testid: req.body.testid,
            questionid: req.body.questionid,
            studentanswerid: req.body.studentanswerid},
            {where: {
                studentanswerid: req.params.id
            }}
        )
            .then(() => {
                res.send("Student Answer Updated!")
            })
            .error(err => res.send(err))
    }
})

//Update Student Answer By student and answer Id
router.put("/updatestudentanswerbyid/:id/:questionid", (req, res) => {
    if(!req.body.questionid) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        StudentAnswer.update(
            {answerid: req.body.answerid,
            studentid: req.body.studentid,
            questionid: req.body.questionid,
            score: req.body.score},
            {where: {
                studentid: req.params.id,
                questionid: req.params.questionid
            }}
        )
            .then(() => {
                res.send("Student Answer Updated By Id!")
            })
            .error(err => res.send(err))
    }
})

//Select Answer
router.get("/selectstudentanswer/:id", (req, res) => {
    StudentAnswer.findOne({
        where: {
            studentanswerid: req.params.id
        }
    })
       .then(studentanswer => {
            res.json(studentanswer)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Answer By Id
router.get("/selectstudentanswerbyId/:id/:questionid", (req, res) => {
    StudentAnswer.findOne({
        where: {
            studentid: req.params.id,
            questionid: req.params.questionid
        }
    })
       .then(studentanswerbyid => {
            res.json(studentanswerbyid)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Answer By Student Id and Test Id
router.get("/selectstudentanswerbytestId/:id/:testid", (req, res) => {
    StudentAnswer.findAll({
        where: {
            studentid: req.params.id,
            testid: req.params.testid
        }
    })
       .then(selectstudentanswerbytestId => {
            res.json(selectstudentanswerbytestId)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Answer By QuestionId
router.get("/selectstudentanswerbyquestion/:id", (req, res) => {
    StudentAnswer.findAll({
        where: {
            questionid: req.params.id
        }
    })
       .then(studentanswerbyquestion => {
            res.json(studentanswerbyquestion)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

module.exports = router