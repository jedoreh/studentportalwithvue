var express = require("express")
var router = express.Router()
const Student = require("../model/Student")

//Get All Students
router.get("/students", (req, res) => {
    Student.findAll()
        .then(students => {
            res.json(students)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add student
router.post("/addstudent", (req, res) => {
    if(!req.body.studentname){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Student.create(req.body)
            .then(() => {
                res.send("Student Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Student
router.delete("/deletestudent/:id", (req, res) => {
    Student.destroy({
        where: {
            studentid: req.params.id
        }
    })
        .then(() => {
            res.send("Student Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Student
router.put("/updatestudent/:id", (req, res) => {
    if(!req.body.studentname) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        Student.update(
            {studentname: req.body.studentname,
            matricnumber: req.body.matricnumber,
            studentnumber: req.body.studentnumber,
            level: req.body.level,
            department: req.body.department,
            faculty: req.body.faculty,
            photo: req.body.photo,
            courseofstudy: req.body.courseofstudy},
            {where: {
                studentid: req.params.id
            }}
        )
            .then(() => {
                res.send("Student Updated!")
            })
            .error(err => res.send(err))
    }
})

//Select Student
router.get("/selectstudent/:id", (req, res) => {
    Student.findOne({
        where: {
            studentid: req.params.id
        }
    })
       .then(student => {
            res.json(student)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student By Matric Number
router.get("/selectstudentmatnumber/:matricnumber", (req, res) => {
    Student.findOne({
        where: {
            matricnumber: req.params.matricnumber
        }
    })
       .then(student => {
            res.json(student)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Select Student By Student Number
router.get("/selectstudentstudentnumber/:studentnumber", (req, res) => {
    Student.findOne({
        where: {
            studentnumber: req.params.studentnumber
        }
    })
       .then(studentbyid => {
            res.json(studentbyid)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

module.exports = router