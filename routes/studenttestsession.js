var express = require("express")
var router = express.Router()
const StudentTestSession = require("../model/StudentTestSession")

//Get All Student Test Sessions
router.get("/studenttestsession", (req, res) => {
    StudentTestSession.findAll()
        .then(studenttestsession => {
            res.json(studenttestsession)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add student Test Sessions
router.post("/addstudenttestsession", (req, res) => {
    if(!req.body.studentid){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        StudentTestSession.create(req.body)
            .then(() => {
                res.send("Student Test Session Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Student Test Session
router.delete("/deletestudenttestsession/:id/:testid/:studenttestsessionid", (req, res) => {
    StudentTestSession.destroy({
        where: {
            studentid: req.params.id,
            testid: req.params.testid,
            studenttestsessionid: req.params.studenttestsessionid
        }
    })
        .then(() => {
            res.send("Student Test Session Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Student Test Session
router.put("/updatestudenttestsession/:id/:testid/:studenttestsessionid", (req, res) => {
    if(!req.body.studentid) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        StudentTestSession.update(
            {studentid: req.body.studentid,
            matricnumber: req.body.matricnumber,
            studentnumber: req.body.studentnumber,
            studentid: req.body.studentid,
            questions: req.body.questions,
            testid: req.body.testid,
            status: req.body.status,
            timeleft: req.body.timeleft,
            timecurrent: req.body.timecurrent,
            score: req.body.score,
            answeredquestions: req.body.answeredquestions},
            {where: {
                studentid: req.params.id,
                testid: req.params.testid,
                studenttestsessionid: req.params.studenttestsessionid
            }}
        )
            .then(() => {
                res.send("Student Test Session Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Student Test Session
router.get("/selectstudenttestsession/:id", (req, res) => {
    StudentTestSession.findOne({
        where: {
            studenttestsessionid: req.params.id
        }
    })
       .then(studenttestsessionbyid => {
            res.json(studenttestsessionbyid)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test Session By Student ID
router.get("/selectstudenttestsessionbystudentid/:id", (req, res) => {
    StudentTestSession.findAll({
        where: {
            studentid: req.params.id
        }
    })
       .then(studenttestsessionbystudentid => {
            res.json(studenttestsessionbystudentid)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test Session By Student ID And Test ID
router.get("/selectstudenttestsessionbystudentidandtest/:id/:testid", (req, res) => {
    StudentTestSession.findOne({
        where: {
            studentid: req.params.id,
            testid: req.params.testid
        }
    })
       .then(selectstudenttestsessionbystudentidandtest => {
            res.json(selectstudenttestsessionbystudentidandtest)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

/*Select Student Test By Student ID And Parent Test ID And Status
router.get("/selectstudenttestsessionbystudentidandteststatus/:id/:testid/:status", (req, res) => {
    StudentTestSession.findAll({
        where: {
            studentid: req.params.id,
            parenttestid: req.params.testid,
            status: req.params.status
        }
    })
       .then(selectstudenttestsessionbystudentidandteststatus => {
            res.json(selectstudenttestsessionbystudentidandteststatus)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Matric Number And Parent Test ID
router.get("/selectstudenttestmatnumber/:matricnumber/:testid", (req, res) => {
    StudentTest.findAll({
        where: {
            matricnumber: req.params.matricnumber,
            parenttestid: req.params.testid
        }
    })
       .then(studenttestbymatricstudenttest => {
            res.json(studenttestbymatricstudenttest)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Matric Number And Parent Test ID And Status
router.get("/selectstudenttestmatnumber/:matricnumber/:testid/:status", (req, res) => {
    StudentTest.findAll({
        where: {
            matricnumber: req.params.matricnumber,
            parenttestid: req.params.testid,
            status: req.params.status
        }
    })
       .then(studenttestbymatricstudentteststatus => {
            res.json(studenttestbymatricstudentteststatus)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Student Number 
router.get("/selectstudenttestbystudentnumber/:studentnumber", (req, res) => {
    StudentTest.findAll({
        where: {
            studentnumber: req.params.studentnumber
        }
    })
       .then(studenttestbystudentnumber => {
            res.json(studenttestbystudentnumber)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Student Number And Parent Test ID
router.get("/selectstudentteststudentnumber/:studentnumber/:testid", (req, res) => {
    StudentTest.findAll({
        where: {
            studentnumber: req.params.studentnumber,
            parenttestid: req.params.testid
        }
    })
       .then(studenttestbystudentnumbertest => {
            res.json(studenttestbystudentnumbertest)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Student Number And Parent Test ID And Status
router.get("/selectstudentteststudentnumber/:studentnumber/:testid/:status", (req, res) => {
    StudentTest.findAll({
        where: {
            studentnumber: req.params.studentnumber,
            parenttestid: req.params.testid,
            status: req.params.status
        }
    })
       .then(studenttestbystudentnumberteststatus => {
            res.json(studenttestbystudentnumberteststatus)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Parent Test ID And Status
router.get("/selectstudenttestststatus/:testid/:status", (req, res) => {
    StudentTest.findAll({
        where: {
            parenttestid: req.params.testid,
            status: req.params.status
        }
    })
       .then(studenttestbyteststatus => {
            res.json(studenttestbyteststatus)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})*/
module.exports = router