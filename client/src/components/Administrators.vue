<template>
    <div class="hello">
        <div id="admins" class="container">
            <div class="row">
                
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">
                        Administrators
                    </h1>
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="#/">Log Out</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/students">Students</a>
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
                    </ul>
                    <form v-on:submit.prevent="addNewAdmin">
                        <label for="adminname">Admin Name</label>
                        <input type="text" v-model="adminname" id="adminname" class="form-control" placeholder="Admin Name">
                        <label for="username">UserName</label>
                        <input type="text" v-model="username" id="username" class="form-control" placeholder="UserName">
                         <label for="adminrole">Admin Role</label>
                        <select id="adminrole" v-model="adminrole" class="form-control" placeholder="Select Role">
                            <option value="Invigilator">Invigilator</option>
                            <option value="Technical">Technical</option>
                            <option value="Server Administrator">Server Administrator</option>
                            <option value="Super Admin">Super Admin</option>
                        </select>
                        <label for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="form-control" placeholder="Password">
                        <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
                            Submit
                        </button>
                        <button v-else v-on:click="updateAdmin()" type="button" class="btn btn-primary btn-block mt-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <br>
                    <table class="table table-responsive">
                        <tr v-for="(admin) in admins"
                        v-bind:key="admin.id"
                        v-bind:title="admin.adminname">
                            <td class="text-left">{{admin.adminname}}</td>
                            <td class="text-left">{{admin.username}}</td>
                            <td class="text-left">{{admin.adminrole}}</td>
                            <td class="text-right">
                                <button class="btn btn-info" 
                                    v-on:click="editAdmin(admin.adminname, 
                                                            admin.username, 
                                                            admin.password, 
                                                            admin.adminrole, 
                                                            admin.adminid)">
                                    Edit
                                </button>
                                <button class="btn btn-danger" v-on:click="deleteAdmin(admin.adminid)">Delete</button>
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
    data() {
        return {
            admins: [],
            adminid: '',
            adminname: '',
            username: '',
            password: '',
            adminrole: '',
            isEdit: false
        }
    },
    mounted() {
        this.getAdmins()
    },
    methods: {
        getAdmins() {
            axios.get("http://localhost:3000/admin/admins").then(
                result => {
                    console.log(result.data)
                    this.admins = result.data
                },
                error => {
                    console.error(error)
                }
            )
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
