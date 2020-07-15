<template>
    <div class="hello">
        <div id="students" class="container">
            <div class="col-md-12 mx-auto">
                <div class='row'>
                    <div v-if="this.errormessage != ''" class="alert alert-danger" role="alert">
                            {{this.errormessage}}
                    </div>
                </div>
            </div>
            <div class="row">
                
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">
                        View Students Examinations
                    </h1>
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="#/">Log Out</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/administrators">Administrators</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/examinations">Examinations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/studenttests">Student Examinations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/student">Students</a>
                        </li>
                    </ul>
                    <form v-on:submit.prevent="getStudents">
                        <label for="studentnumber">Enter Student Number</label>
                        <input type="text" v-model="studentnumber" id="studentnumber" class="form-control" placeholder="Student Number">
                        
                        <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
                            Submit
                        </button>
                        <button v-else v-on:click="updateStudent()" type="button" class="btn btn-primary btn-block mt-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <br>
                    
                    <table v-if="this.isStudent==true" class="table table-responsive">
                        <tr v-bind:title="this.studentname">
                            <td class="text-left"><img v-bind:src="server + '/images/' + this.photo" class="img-thumbnail" /></td>
                            <td class="text-left"><h3>{{this.studentname}}</h3>
                                {{this.studentnumber}}<br>
                                {{this.matricnumber}}<br>
                                {{this.level}} Level
                                </td>
                            <td class="text-left"><h5>{{this.faculty}}</h5><br>
                                Department of {{this.department}}<br>
                                {{this.courseofstudy}}</td>
                            
                        </tr>
                    </table>
                    <table v-if="this.isStudent==true" class="table table-responsive">
                        <tr v-bind:title="this.parenttest">
                            <td class="text-left" col-span='2'>
                                <h5>Examination: {{this.parenttest}}</h5>
                            </td>
                            <td class="text-left" col-span='2'>
                                <h5>Status: {{this.status}}</h5>
                            </td>
                            <td class="text-right">
                                <button class="btn btn-primary"
                                    v-on:click="Logout('Activated')">
                                    Log Student Out
                                </button>
                                <button class="btn btn-danger" v-on:click="Submit()">
                                    Submit Student Examination
                                </button>
                            </td>
                        </tr>
                    </table>
                     
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['server', 'images'],
    data() {
        return {
            studentimage: '',
			api: { upload: "http://localhost:3000/upload",
					retrieve: "http://localhost:3000/retrieve" },
            students: [],
            studenttests: [],
            tests: [],
            studentid: '',
            studentname: '',
            matricnumber: '',
            studentnumber: '',
            studenttestid: '',
            studenttestscore: '',
            studenttestcgpa: '',
            studenttestgrade: '',
            studentteststatus: '',
            parenttest: '',
            department: '',
            faculty: '',
            level: '',
            photo: '',
            courseofstudy: '',
            picture: '',
            previewImage: null,
            isEdit: false,
            isStudent: false,
            errormessage: '',
            status: '',
            i: '',
            gettestscores: [],
            studenttestsessionid: '',
            testsessionscore: '',
            testsessionstatus: '',
            testid: '',
            loggedstudentnumber: ''
        }
    },
    mounted() {
       // this.getStudents()
    },
    methods: {
        getStudents() {
            this.isloggedinsuccess=false
            if (this.studentnumber == '') {
                this.errormessage = 'Username field cannot be left blank'
            }else{
                axios.get(`http://localhost:3000/students/selectstudentstudentnumber/${this.studentnumber}`).then(
                    result => {
                        console.log(result.data)
                        this.students = result.data
                        this.errormessage = ''
                        if (this.students == null) {
                            console.log("No Record Found")
                            this.errormessage = "Student Number not Found"
                        }else{
                            
                            this.isStudent=true
                            this.studentname = this.students.studentname
                            this.matricnumber = this.students.matricnumber
                            this.faculty = this.students.faculty
                            this.department = this.students.department
                            this.photo = this.students.photo
                            this.level = this.students.level
                            this.courseofstudy = this.students.courseofstudy
                            this.loggedstudentnumber = this.students.studentnumber
                            this.studentid = this.students.studentid
                            this.getStudentTests()
                        }
                        //console.log(this.isloggedinsuccess)
                        this.studentnumber = ''
                    
                    },
                    error => {
                        console.error(error)
                    }
                )
            }
            
        },
        getStudentTests() {
            this.isExam = false
            if (this.studentid == '') {
                this.errormessage = 'No Student Found'
            }else{
                axios.get(`http://localhost:3000/studenttest/selectstudenttestbystudentid/${this.studentid}`).then(
                    result => {
                        console.log(result.data)
                        
                        this.studenttests = result.data
                        this.isExam = true
                        this.parenttest = this.studenttests.parenttest
                        this.parenttestid = this.studenttests.parenttestid
                        this.status = this.studenttests.status
                        this.studenttestid = this.studenttests.studenttestid
                        console.log(this.studenttestid)
                        console.log(this.isStudent)
                    },
                    error => {
                        console.error(error)
                        this.errormessage = 'Student Examination Record Not Found'
                    }
                )
            }
        },
        addNewStudent() {
            axios.post("http://localhost:3000/students/addstudent", {studentname: this.studentname,
                                            matricnumber: this.matricnumber,
                                            studentnumber: this.studentnumber,
                                            level: this.level,
                                            department: this.department,
                                            faculty: this.faculty,
                                            photo: this.photo,
                                            courseofstudy: this.courseofstudy})
            .then((res) => {
                this.studentname = ''
                this.matricnumber = ''
                this.studentnumber = ''
                this.level = ''
                this.department = ''
                this.faculty = ''
                this.previewImage = null,
                this.photo = ''
                this.courseofstudy = ''
                this.getStudents()
            }).catch((err) => {
                console.log(err)
            })
        },
        Logout (selectstatus) {
            axios.put(`http://localhost:3000/studenttest/updatestudenttest/${this.studentid}/${this.parenttestid}/${this.studenttestid}`,
            {studenttestid: this.studenttestid,
                status: selectstatus,
                studentid: this.studentid})
            .then((res) => {
                
                this.getStudentTests()
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        Submit(){
             this.getTestScores()
            this.errormessage = 'You Have Submitted Successfully'
            
            //Check if other exams are still on
            //Update Overall Student test scores
            this.getOverallTestScores()
             this.errormessage = 'You Have Submitted Successfully'
        },
        getTests() {
            //this.isTest=false
            if (this.studentid == '') {
                this.errormessage = 'No Student Found'
            }else{
                axios.get(`http://localhost:3000/studenttestsessions/selectstudenttestsessionbystudentid/${this.studentid}`).then(
                result => {
                    console.log(result.data)
                    this.tests = result.data
                    this.errormessage = ''
                    let testid = ''
                    if (this.tests == null) {
                        console.log("No Record Found")
                        this.errormessage = "No Test For Student Found"
                    }else{
                       for (this.i;this.i<this.tests.length;this.i++) {
                           this.testid = this.tests[this.i].testid
                            this.testsessionscore = this.tests[this.i].score
                            this.testsessionstatus = this.tests[this.i].status
                            this.studenttestsessionid = this.tests[this.i].studenttestsessionid
                            getTestScores(this.testid)
                       }

                    }
                  
                   
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        getTestScores(testid) {
            //this.isTest=false
            if (this.testid == '') {
                this.errormessage = 'No Tests Found'
            }else{
                axios.get(`http://localhost:3000/studentanswers/selectstudentanswerbytestId/${this.studentid}/${testid}`).then(
                result => {
                    console.log(result.data)
                    this.gettestscores = result.data
                    this.errormessage = ''
                    let score = 0
                    if (this.gettestscores == null) {
                        console.log("No Record Found")
                        this.errormessage = "No Test Scores For Student Found"
                    }else{
                       console.log("Test Records Found")
                       for (this.i=0;this.i<this.gettestscores.length;this.i++){
                            score = score + this.gettestscores[this.i].score
                            //console.log('Score: ',score)
                       }
                    }
                    this.testsessionscore = score
                    console.log('Score: ',this.testsessionscore)
                    this.testsessionstatus = 'Completed'
                    this.isComplete = true
                    this.updateTestSession()
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        updateTestSession () {
            axios.put(`http://localhost:3000/studenttestsession/updatestudenttestsession/${this.studentid}/${this.testid}/${this.studenttestsessionid}`,
            {status: this.testsessionstatus,
                score: this.testsessionscore,
                studentid: this.studentid})
            .then((res) => {
                               
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getOverallTestScores() {
            //this.isTest=false
            if (this.studentid == '') {
                this.errormessage = 'No Students Found'
            }else{
                axios.get(`http://localhost:3000/studenttestsession/selectstudenttestsessionbystudentid/${this.studentid}`).then(
                result => {
                    console.log(result.data)
                    this.getoveralltestscores = result.data
                    this.errormessage = ''
                    let score = 0
                    if (this.getoveralltestscores == null) {
                        console.log("No Record Found")
                        this.errormessage = "No Overall Test Scores For Student Found"
                    }else{
                       console.log("Overall Test Records Found", this.getoveralltestscores.length)
                       for (this.i=0;this.i<this.getoveralltestscores.length;this.i++){
                           console.log(this.getoveralltestscores[this.i].status)
                           
                                score = score + this.getoveralltestscores[this.i].score
                            //console.log('Score: ',score)
                           
                           
                       }
                    }
                    this.studenttestscore = score
                    this.studentteststatus = 'Exam Completed'
                    console.log('overall score: ',this.studenttestscore)
                    this.updateStudentTest()
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        updateStudentTest () {
            axios.put(`http://localhost:3000/studenttest/updatestudenttest/${this.studentid}/${this.parenttestid}/${this.studenttestid}`,
            {status: this.studentteststatus,
                cgpa: this.studenttestcgpa,
                score: this.studenttestscore,
                grade: this.studenttestgrade,
                studentid: this.studentid})
            .then((res) => {
                console.log(this.studentteststatus)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
         uploadImage (e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    console.log(image.name);
					this.photo = image.name
            };

			//const file = this.$refs.file.files[0]
			//const formData = new FormData

			const title = image.name
           
            let payload = new FormData()
            payload.append("title", title)
            payload.append("image", image)

			//formData.append('file', file)

			fetch(this.api.upload, {
                method: "POST",
                body: payload
            }).then(response => {
                return response.json()
            })
            this.photo = ''
		/* 	try {
				axios.post("http://localhost:3000/upload", formData)
				console.log('Image Uploaded')
				console.log(file)
			}
			catch(err) {
				console.log(err)
			} */
        }
    }
}
</script>
