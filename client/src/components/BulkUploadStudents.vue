<template>
    <div class="hello">
        <div id="students" class="container">
            <div class="row">
                
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">
                        Students
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
                            <a class="nav-link" href="#/viewstudenttests">View Student Examinations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/students">Students</a>
                        </li>
                    </ul>
                        <h2>Upload List of Students</h2>
                          <label for="number">Select Examination</label>
                         <table>
                            <tr v-for="(parenttest) in parenttests"
                            v-bind:key="parenttest.parenttestid"
                            v-bind:title="parenttest.parenttest">
                                <td class="text-left">
                                    <label v-on:click="selectParentTest(parenttest.parenttestid,parenttest.parenttest)">
                                        <input type="radio" value="parenttest.parenttestid" name="parenttest">
                                       
                                        {{parenttest.parenttest}}<br>
                                        
                                    </label>
                                    
                                </td>
                                    
                                
                            </tr>
                           
                        </table>
                        <label for="number">Total Number to Upload</label>
                        <input type="text" v-model="number" id="number" class="form-control" placeholder="Total Number to Upload">
                        <br>
                        <label for="studentname">Upload File</label>
                        <input type="file" ref="myFile" @change="selectedFile"> 
                        <input type="submit" value="Upload File" />
                       
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 mx-auto">
                    <div v-if="allNames.length">
                            <p>Your file contains {{allNames.length}} names. Here's the first ten names.</p>
                            <ul>
                            <li v-for="name in names" v-bind:key="name">{{name}}</li>
                            </ul>
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
            studentid: '',
            studentname: '',
            matricnumber: '',
            studentnumber: '',
            department: '',
            faculty: '',
            level: '',
            photo: '',
            courseofstudy: '',
            picture: '',
            previewImage: null,
            isEdit: false,
            allNames:[],
            number: '',
            i: '',
            parenttests: [],
            studenttests: [],
            studenttestid: '',
            status: '',
            parenttestid: '',
            parenttest: ''
        }
    },
    computed:{
        names() {
        return this.allNames.slice(0,this.number);
        }
    },
    mounted() {
        this.getExams()
        this.getStudents()
    },
    methods: {
        getStudents() {
            axios.get("http://localhost:3000/students/students").then(
                result => {
                    console.log(result.data)
                    this.students = result.data
                },
                error => {
                    console.error(error)
                }
            )
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
                this.addNewStudentTest()
                this.getStudents()
            }).catch((err) => {
                console.log(err)
            })
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
        selectParentTest (parenttestid,parenttest) {
            this.parenttestid = parenttestid
            this.parenttest = parenttest
           
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
        selectedFile() {
      console.log('selected a file');
      console.log(this.$refs.myFile.files[0]);
      
      let file = this.$refs.myFile.files[0];
      if(!file || file.type !== 'text/plain') return;
      
      // Credit: https://stackoverflow.com/a/754398/52160
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      
      reader.onload = evt => {
        let text = evt.target.result;
        this.allNames = text.split(/\r?\n/);
        
        //empty string at end?
        if(this.allNames[this.allNames.length-1] === '') this.allNames.pop();
        this.status = 'Activated'
        for (this.i=0;this.i<this.allNames.length;this.i++){
            
            let student = this.allNames[this.i].split(',')
            console.log(student)
            this.studentname = student[0].trim()
            this.matricnumber = student[1].trim()
            this.studentnumber = student[2].trim()
            this.level = student[3].trim()
            this.department = student[4].trim()
            this.faculty = student[5].trim()
            this.photo = student[6].trim()
            this.courseofstudy = student[7].trim()
            this.addNewStudent()
            console.log('added')
        }

      }
      
      reader.onerror = evt => {
        console.error(evt);
      }
      
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
