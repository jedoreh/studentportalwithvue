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
                            <a class="nav-link" href="#/bulkUploadStudents">Students Bulk Upload</a>
                        </li>
                    </ul>
                    <form v-on:submit.prevent="addNewStudent">
                        <label for="studentname">Student Name</label>
                        <input type="text" v-model="studentname" id="studentname" class="form-control" placeholder="Student Name">
                        <label for="matricnumber">Matriculation Number</label>
                        <input type="text" v-model="matricnumber" id="matricnumber" class="form-control" placeholder="Matriculation Number">
                        <label for="studentnumber">Student Number</label>
                        <input type="text" v-model="studentnumber" id="studentnumber" class="form-control" placeholder="Student Number">
                         <label for="level">Level</label>
                        <select id="level" v-model="level" class="form-control" placeholder="Select Level">
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                            <option value="500">500</option>
                            <option value="600">600</option>
                            <option value="700">700</option>
                            <option value="800">800</option>
                        </select>
                        <label for="faculty">Faculty</label>
                        <input type="text" v-model="faculty" id="faculty" class="form-control" placeholder="Faculty">
                        <label for="department">Department</label>
                        <input type="text" v-model="department" id="department" class="form-control" placeholder="Department">
                        <label for="courseofstudy">Course of Study</label>
                        <input type="text" v-model="courseofstudy" id="courseofstudy" class="form-control" placeholder="Course of Study">
                        <label for="photo">Student Image</label>
                        <img v-bind:src="previewImage" class="uploading-image img-thumbnail" />
                        <img v-bind:src="server + '/images/' + photo" class="img-thumbnail" />
                        <input type="file" id="image" ref="file" class="form-control" accept="image/jpeg" @change=uploadImage>
                       	<input type="text" v-model="photo" class="form-control" id="photo"  placeholder="Enter Student photo">
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
                <div class="col-md-8 mx-auto">
                    <br>
                    
                    <table class="table table-responsive">
                        <tr v-for="(student) in students"
                        v-bind:key="student.studentid"
                        v-bind:title="student.studentname">
                            <td class="text-left"><img v-bind:src="server + '/images/' + student.photo" class="img-thumbnail" /></td>
                            <td class="text-left"><h3>{{student.studentname}}</h3>
                                {{student.studentnumber}}<br>
                                {{student.matricnumber}}<br>
                                {{student.level}} Level
                                </td>
                            <td class="text-left"><h5>{{student.faculty}}</h5><br>
                                Department of {{student.department}}<br>
                                {{student.courseofstudy}}</td>
                            <td class="text-right">
                                <button class="btn btn-info"
                                    v-on:click="editStudent(student.studentid,
                                                            student.studentname, 
                                                            student.matricnumber, 
                                                            student.studentnumber,
                                                            student.level, 
                                                            student.department,
                                                            student.faculty,
                                                            student.photo,
                                                            student.courseofstudy)">
                                    Edit
                                </button>
                                <button class="btn btn-danger" v-on:click="deleteStudent(student.studentid)">Delete</button>
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
            isEdit: false
        }
    },
    mounted() {
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
                this.getStudents()
            }).catch((err) => {
                console.log(err)
            })
        },
        editStudent(studentid,studentname,matricnumber,studentnumber,level,department,faculty,photo,courseofstudy) {
            this.studentid = studentid
            this.studentname = studentname
            this.matricnumber = matricnumber
            this.studentnumber = studentnumber
            this.level = level
            this.department = department
            this.faculty = faculty
            this.photo = photo
            this.courseofstudy = courseofstudy
            this.isEdit = true
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
        deleteStudent(studentid){
            axios.delete(`http://localhost:3000/students/deletestudent/${studentid}`)
            .then((res) => {
                this.studentname = ''
                this.matricnumber = ''
                this.studentnumber = ''
                this.level = ''
                this.department = ''
                this.faculty = ''
                this.photo = ''
                this.courseofstudy = ''
                this.getStudents()
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
