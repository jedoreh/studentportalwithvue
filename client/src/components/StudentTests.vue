<template>
    <div class="hello">
        <div id="students" class="container">
            <div class="row">
                
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">
                        Student Examinations
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
                            <a class="nav-link" href="#/student">Students</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/studenttests">Student Examinations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/viewstudenttests">View Student Examinations</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-6 mx-auto">
                        <br>
                        <div class="col-md-8 mx-auto"> 
                            Enter Student Number
                        </div>
                        <div class="col-md-8 mx-auto"> 
                            <input type="text" v-model="searchStudentNumber" id="searchStudentNumber" class="form-control" placeholder="Search Student Number">
                        </div>
                        <div class="col-md-8 mx-auto"> 
                            <button class="btn btn-success" v-on:click.prevent="searchForStudent()">Search</button>
                        </div>
                       
                        <table v-if="this.studentnumber!=''" class="table table-responsive">
                            <tr>
                                <td class="text-left"><img v-bind:src="server + '/images/' + this.studentphoto" class="img-thumbnail" /></td>
                                <td class="text-left"><h3>{{this.studentname}}</h3>
                                    {{this.studentnumber}}<br>
                                    {{this.matricnumber}}<br>
                                    {{this.department}} 
                                </td>
                                <!--<td class="text-right">
                                    <button class="btn btn-info" 
                                        v-on:click="selectStudentTest(this.studentid,
                                                                this.studentname, 
                                                                this.matricnumber, 
                                                                this.studentnumber,
                                                                this.faculty,
                                                                this.department)">
                                        Select
                                    </button>
                                    
                                </td>-->
                            </tr>
                        </table>
                        <br>
                        <table class="table table-responsive">
                            <tr v-for="(parenttest) in parenttests"
                            v-bind:key="parenttest.parenttestid"
                            v-bind:title="parenttest.parenttest">
                                
                                <td class="text-left"><h3>{{parenttest.parenttest}}</h3>
                                    {{parenttest.date}}<br>
                                   
                                <td class="text-left">
                                    Instructions: {{parenttest.instruction}}<br>
                                    <!--{{student.courseofstudy}}--></td>
                                <td class="text-right">
                                    <button class="btn btn-info" 
                                        v-on:click="selectParentTest(parenttest.parenttestid,
                                                                parenttest.parenttest, 
                                                                parenttest.date, 
                                                                parenttest.instruction)">
                                        Select
                                    </button>
                                    
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                
                    <div class="col-md-6 mx-auto">
                        <br>
                        <form v-on:submit.prevent="addNewStudentTest">
                            
                            <input type="text" id="studentname" v-model="studentname" class="form-control disabled" placeholder="Student Name">
                            <input type="text" id="matricnumber" v-model="matricnumber" class="form-control disabled" placeholder="Student Matriculation Number">
                            <input type="text" id="studentnumber" v-model="studentnumber" class="form-control disabled" placeholder="Student Name">
                            <input type="hidden" id="studentid" v-model="studentid">
                            <input type="text" id="department" v-model="department" class="form-control disabled" placeholder="Department">
                            <input type="text" id="faculty" v-model="faculty" class="form-control disabled" placeholder="Faculty">
                            <input type="text" id="parenttest" v-model="parenttest" class="form-control disabled" placeholder="Examination Name">
                            
                            <label for="status">Status</label>
                            <select id="status" v-model="status" class="form-control" placeholder="Student Test Status">
                                <option value="Not Active">Not Active</option>
                                <option value="Activated">Activated</option>
                            </select>
                            
                            <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
                                Submit
                            </button>
                            
                        </form>
                        <br>
                        
                        <table class="table table-responsive">
                            <tr v-for="(studenttest) in studenttests"
                            v-bind:key="studenttest.studenttestid"
                            v-bind:title="studenttest.studentname">
                                
                                <td class="text-left"><h3>{{studenttest.studentname}}</h3>
                                    {{studenttest.studentnumber}}<br>
                                    {{studenttest.matricnumber}}<br>
                                    {{studenttest.department}} Level
                                <td class="text-left"><h5>{{studenttest.parenttest}}</h5><br>
                                    Examination Status: {{studenttest.status}}<br>
                                    <!--{{student.courseofstudy}}--></td>
                                <td class="text-right">
                                    
                                    <button class="btn btn-danger" v-on:click="deleteStudentTest(studenttest.studentid,studenttest.parenttestid,studenttest.studenttestid)">Delete</button>
                                </td>
                            </tr>
                        </table>
                        
                    </div>
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
            parenttests: [],
            studenttests: [],
            studenttestid: '',
            status: '',
            parenttestid: '',
            parenttest: '',
            date: '',
            instruction: '',
            studentid: '',
            studentname: '',
            matricnumber: '',
            studentnumber: '',
            searchStudentNumber: '',
            department: '',
            faculty: '',
            studentphoto: '',
            level: '',
            status: '',
            courseofstudy: '',
            picture: '',
            previewImage: null,
            isEdit: false,
            studentList: [],
            i: '',
            isFound: false
        }
    },
    mounted() {
        this.searchStudent()
        this.getExams()
    },
    methods: {
        searchStudent() {
            let studentnumber = 'B908932'
            axios.get("http://localhost:3000/students/students").then(
                result => {
                    console.log(result.data)
                    this.studentList = result.data
                    console.log(this.studentList)
                    //this.studentname = this.studentList[0].studentname
                },
                error => {
                    console.error(error)
                }
            )
        },
        searchStudentByStudentNumber() {
            
            axios.get(`http://localhost:3000/students/selectstudentstudentnumber/${this.studentnumber}`).then(
                result => {
                    console.log(result.data)
                    this.students = result.data
                    console.log(this.students)
                    //this.studentname = this.studentList[0].studentname
                },
                error => {
                    console.error(error)
                }
            )
        },
        searchForStudent() {
            
            console.log(this.searchStudentNumber)
            for (this.i=0; this.i<this.studentList.length;this.i++){
                console.log(this.studentList[this.i].studentname)
                if (this.searchStudentNumber == this.studentList[this.i].studentnumber) {
                   
                    this.isFound = true
                    this.studentname = this.studentList[this.i].studentname
                    this.studentphoto = this.studentList[this.i].photo
                    this.studentnumber = this.studentList[this.i].studentnumber
                    this.matricnumber = this.studentList[this.i].matricnumber
                    this.department = this.studentList[this.i].department
                    this.faculty = this.studentList[this.i].faculty
                    this.studentid = this.studentList[this.i].studentid
                    this.getStudentTests()
                }
            }
            if (this.isFound==true) {
                console.log("Student Number Found")
                this.studentnumber = this.searchStudentNumber
                console.log(this.studentnumber)
                console.log(this.studentid)
                this.searchStudentByStudentNumber()
            } else {
                console.log("Student Number Not Found")
            }
            
        },
        getStudentTests() {
            if (this.studentnumber!='') {
                axios.get(`http://localhost:3000/studenttest/selectstudenttestbystudentnumber/${this.studentnumber}`).then(
                    result => {
                        console.log(result.data)
                        this.studenttests = result.data
                    },
                    error => {
                        console.error(error)
                    }
                )
            }
            
        },
         getExams() {
            axios.get("http://localhost:3000/parenttests/parenttests").then(
                result => {
                    console.log(result.data)
                    this.parenttests = result.data
                },
                error => {
                    console.error(error)
                }
            )
        },
        addNewStudentTest() {
            if(this.studentname!=''){
                axios.post("http://localhost:3000/studenttest/addstudenttest", {studentname: this.studentname,
                                            matricnumber: this.matricnumber,
                                            studentnumber: this.studentnumber,
                                            status: this.status,
                                            department: this.department,
                                            faculty: this.faculty,
                                            parenttestid: this.parenttestid,
                                            parenttest: this.parenttest,
                                            studentid: this.studentid})
                .then((res) => {
                  
                    this.getStudentTests()
                    //this.studentnumber = ''
                }).catch((err) => {
                    console.log(err)
                })
            }
            
        },
        selectStudentTest(studentid,studentname,matricnumber,studentnumber,faculty,department) {
            console.log(studentid)
            this.studentid = studentid
            this.studentname = studentname
            this.matricnumber = matricnumber
            this.studentnumber = studentnumber
           
            this.department = department
            this.faculty = faculty
            console.log(studentnumber)
            this.getStudentTests()
        },
        selectParentTest (parenttestid,parenttest,date,instruction) {
            this.parenttestid = parenttestid
            this.parenttest = parenttest
            this.date = date
            this.instruction = instruction
        },
        updateStudent () {
            axios.put(`http://localhost:3000/students/updatestudent/${this.studentid}`,
            {studentname: this.studentname,
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
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        deleteStudentTest(studentid,parenttestid,studenttestid){
            axios.delete(`http://localhost:3000/studenttest/deletestudenttest/${studentid}/${parenttestid}/${studenttestid}`)
            .then((res) => {
               
                this.getStudentTests()
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
