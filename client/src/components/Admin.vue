<template>
    <div class="hello">
        <div id="admins" class="container">
            <div v-if="this.isloggedinsuccess==false" class="row">
                
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">
                        Administrator Log In
                    </h1>
                    <div v-if="this.errormessage != ''" class="alert alert-danger" role="alert">
                        {{this.errormessage}}
                    </div>
                    <form v-on:submit.prevent="getAdmins">
                        <label for="username">UserName</label>
                        <input type="text" v-model="username" id="username" class="form-control" placeholder="UserName">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="form-control" placeholder="Password">
                        <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
                            Submit
                        </button>
                        <button v-else v-on:click="updateAdmin()" type="button" class="btn btn-primary btn-block mt-3">
                            Update
                        </button>
                        <br>
                        <a href="/#/studenttestsession" class="btn btn-danger btn-lg">Click Here To Go To Student Examinations</a>
                    </form>
                </div>
            </div>
            <div v-if="this.isloggedinsuccess==true" class="row">
                <div class="col-md-12 mx-auto">
                    <br>
                   <h2>Welcome {{this.adminname}}</h2>
                   <h5>Click on the links to navigate the App</h5>
                </div>
                <div class="col-md-4 mx-auto">
                    <br>
                    <a href="/#/administrators" class="btn btn-success btn-lg">View Admistrators</a>
                </div>
                <div class="col-md-4 mx-auto">
                    <br>
                    <a href="/#/students" class="btn btn-success btn-lg">View Students</a>
                </div>
                 <div class="col-md-4 mx-auto">
                    <br>
                    <a href="/#/examinations" class="btn btn-success btn-lg">View Examinations</a>
                </div>
                <div class="col-md-4 mx-auto">
                    <br>
                    <a href="/#/studenttests" class="btn btn-success btn-lg">Student Examinations</a>
                </div>
                <div class="col-md-4 mx-auto">
                    <br>
                    <a href="/#/viewstudenttests" class="btn btn-success btn-lg">View Student Examinations</a>
                </div>
                <!-- <div class="col-md-4 mx-auto">
                    <br>
                    <a href="/#/bulkuploadstudents" class="btn btn-success btn-lg">Bulk Student Upload</a>
                </div> -->
                <div class="col-md-4 mx-auto">
                    <br>
                    <button v-on:click="logout()" type="button" class="btn btn-warning btn-lg">
                            Log Out
                        </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            admins: [],
            adminid: '',
            adminname: '',
            username: '',
            password: '',
            adminrole: '',
            isEdit: false,
            isloggedinsuccess: false,
            errormessage: ''
        }
    },
    /* mounted() {
        this.getAdmins()
    }, */
    methods: {
        getAdmins() {
            this.isloggedinsuccess=false
            if (this.username == '') {
                this.errormessage = 'Username field cannot be left blank'
            }else{
                axios.get(`http://localhost:3000/admin/selectadminusername/${this.username}`).then(
                result => {
                    console.log(result.data)
                    this.admins = result.data
                    this.errormessage = ''
                    if (this.admins == null) {
                        console.log("No Record Found")
                        this.errormessage = "Username not Found"
                    }else{
                        console.log(this.username,this.admins.username)
                        if (this.admins.password == this.password) {
                            console.log("Passwords Match")
                            this.isloggedinsuccess=true
                            this.adminname = this.admins.adminname
                        }else{
                            console.log("Passwords Do Not Match")
                            this.errormessage = "Passwords do not Match"
                            this.isloggedinsuccess=false
                        }
                    }
                    console.log(this.isloggedinsuccess)
                    this.username = ''
                    this.password = ''
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        addNewAdmin() {
            axios.post("/admin/addadmin", {adminname: this.adminname,
                                            username: this.username,
                                            password: this.password,
                                            adminrole: this.adminrole})
            .then((res) => {
                this.adminname = ''
                this.username = ''
                this.password = ''
                this.adminrole = ''
                this.getAdmins()
            }).catch((err) => {
                console.log(err)
            })
        },
        logout() {
            this.isloggedinsuccess=false
        },
        editAdmin(adminname,username,password,adminrole,adminid) {
            this.adminid = adminid
            this.adminname = adminname
            this.username = username
            this.password = password
            this.adminrole = adminrole
            this.isEdit = true
        },
        updateAdmin () {
            axios.put(`/admin/updateadmin/${this.adminid}`,
            {adminname: this.adminname,
                username: this.username,
                password: this.password,
                adminrole: this.adminrole})
            .then((res) => {
                this.adminname = ''
                this.username = ''
                this.password = ''
                this.adminrole = ''
                this.getAdmins()
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        deleteAdmin(adminid){
            axios.delete(`http://localhost:3000/admin/deleteadmin/${adminid}`)
            .then((res) => {
                this.adminname = ''
                this.username = ''
                this.password = ''
                this.adminrole = ''
                this.getAdmins()
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
