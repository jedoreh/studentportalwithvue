var express = require("express")
var router = express.Router()
const StudentTest = require("../model/StudentTest")

//Get All Student Tests
router.get("/studenttest", (req, res) => {
    StudentTest.findAll()
        .then(studenttest => {
            res.json(studenttest)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add student Test
router.post("/addstudenttest", (req, res) => {
    if(!req.body.studentid){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        StudentTest.create(req.body)
            .then(() => {
                res.send("Student Test Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Student Test
router.delete("/deletestudenttest/:id/:testid/:studenttestid", (req, res) => {
    StudentTest.destroy({
        where: {
            studentid: req.params.id,
            parenttestid: req.params.testid,
            studenttestid: req.params.studenttestid
        }
    })
        .then(() => {
            res.send("Student Test Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Student Test
router.put("/updatestudenttest/:id/:testid/:studenttestid", (req, res) => {
    if(!req.body.studentid) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        StudentTest.update(
            {studentname: req.body.studentname,
            matricnumber: req.body.matricnumber,
            studentnumber: req.body.studentnumber,
            studentid: req.body.studentid,
            department: req.body.department,
            faculty: req.body.faculty,
            parenttestid: req.body.parenttestid,
            parenttest: req.body.parenttest,
            cgpa: req.body.cgpa,
            score: req.body.score,
            grade: req.body.grade,
            status: req.body.status},
            {where: {
                studentid: req.params.id,
                parenttestid: req.params.testid,
                studenttestid: req.params.studenttestid
            }}
        )
            .then(() => {
                res.send("Student Test Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Student Test
router.get("/selectstudenttest/:id", (req, res) => {
    StudentTest.findOne({
        where: {
            studenttestid: req.params.id
        }
    })
       .then(studenttest => {
            res.json(studenttest)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Student ID
router.get("/selectstudenttestbystudentid/:id", (req, res) => {
    StudentTest.findOne({
        where: {
            studentid: req.params.id
        }
    })
       .then(studenttestbystudentid => {
            res.json(studenttestbystudentid)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Student ID And Parent Test ID
router.get("/selectstudenttestbystudentidandparenttest/:id/:testid", (req, res) => {
    StudentTest.findAll({
        where: {
            studentid: req.params.id,
            parenttestid: req.params.testid
        }
    })
       .then(studenttestbystudentidandparenttest => {
            res.json(studenttestbystudentidandparenttest)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student Test By Student ID And Parent Test ID And Status
router.get("/selectstudenttestbystudentidandparentteststatus/:id/:testid/:status", (req, res) => {
    StudentTest.findAll({
        where: {
            studentid: req.params.id,
            parenttestid: req.params.testid,
            status: req.params.status
        }
    })
       .then(studenttestbystudentidandparentteststatus => {
            res.json(studenttestbystudentidandparentteststatus)
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
})
module.exports = router