<template>
    <div class="hello">
        <div id="admins" class="container">
           
            <div class="col-md-12 mx-auto">
                <div class='row' style="padding-top:30px">
                    <div v-if="this.errormessage != ''" class="alert alert-danger" role="alert" style="margin: 0px auto;">
                            {{this.errormessage}}
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 mx-auto">
                <div v-if="this.isloggedinsuccess==false">
                    <div class="row">
                        <br>
                        <h3 class="text-center" style="margin: 0px auto;padding-top:30px;"><b>Student Log In</b><br>Enter Your Student Number</h3>
                        <br>
                        <br>
                    </div>

                    <div class="row" style="text-align:center;">
                        <form v-on:submit.prevent="getStudents" class="text-center" style="margin: 0px auto;">
                             <br>
                        <label for="studentnumber">Student Number</label>
                        <input type="text" v-model="studentnumber" id="studentnumber" class="form-control" placeholder="Enter Student Number Here">
                        <!--<label for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="form-control" placeholder="Password">-->
                        <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
                            Submit
                        </button>
                        <button v-else v-on:click="updateAdmin()" type="button" class="btn btn-primary btn-block mt-3">
                            Update
                        </button>
                    </form>
                    </div>
                
                    
                    
                    
                </div>
            </div>

            <div v-if="this.isloggedinsuccess==true" class="row">
                <div class="col-md-12 mx-auto test">
                
                
                    
                   <div v-if="this.isExam==true" class="col-md-12 mx-auto test-left">
                        <br>
                        <div class="text-center"><img v-bind:src="server + '/images/' + this.photo" class="img-thumbnail sm" style="width: 25%; height: 25%;" /></div>
                        <h2>{{this.studentname}}</h2>
                        <h5>{{this.matricnumber}}</h5>
                        <h5>{{this.studentnumber}}</h5>
                        <h5>{{this.faculty}}, {{this.department}}, {{this.level}} Level</h5>
                        <br>
                        <div style="margin:0px auto;">
                            <div>
                            <div v-for="(test) in tests"
                            v-bind:key="test.testid"
                            v-bind:title="test.test">
                                
                                <h3>{{test.test}}</h3>
                                   
                                <p> Status: {{test.status}}<br>
                                    <!--{{student.courseofstudy}}--></p>
                                <p>
                                    
                                    <button class="btn btn-success" v-on:click="selectTest(test.testid,test.test,test.totaltime,test.numberofquestions)">Select</button>
                                </p>
                                <hr>
                            </div> 
                            <div>
                                <p>
                                   
                                        <button v-on:click="logout()"
                                            class="btn btn-info">
                                            Log Out
                                        </button>
                            
                                        <br>
                                   
                                </p>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    <div class="col-md-6 mx-auto test-right">
                        <br>
                        <h2>{{this.selectedtest}}</h2>
                        <p v-if="this.question!='' && this.isComplete == false" style="font-size:x-large;">
                            <span>
                                   You Have Answered <b>{{this.displayansweredquestions}}</b> out of {{this.displaytotalquestions}} Questions
                            </span><br><br>
                            <span id="timer" class="timer">{{this.testsessiontimecurrent}}</span>
                            <br><br>
                            {{this.questionnumber}}. {{this.question}}
                            <br>
                            <img v-bind:src="server + '/images/' + this.questionimage" class="img-thumbnail" />
                        </p>

                        <table v-if="this.question!='' && this.isComplete == false" class="table table-responsive">
                            <tr v-for="(answer) in answers"
                            v-bind:key="answer.answerid"
                            v-bind:title="answer.answer">
                                <td class="text-left">
                                    <label v-on:click="selectAnswer(answer.answerid,answer.answer,answer.score)">
                                        <input type="radio" value="answer.score" name="answer" :checked="answer.answerid == answeroption">
                                       
                                        {{answer.answer}}<br>
                                        <img v-bind:src="server + '/images/' + answer.image" class="img-thumbnail" />
                                    </label>
                                    
                                </td>
                                    
                                
                            </tr>
                           
                        </table>
                        <!--<p v-if="this.question!=''">
                            <button v-on:click="onQuestion(firstquestion,firstindex)"
                                class="btn btn-info">
                                First Question
                            </button>
                            <button v-on:click="onQuestion(previousquestion,index--)"
                                class="btn btn-info">
                                Previous Question
                            </button>
                            <button v-on:click="onQuestion(nextquestion,index++)"
                                class="btn btn-info">
                                Next Question
                            </button>
                            <button v-on:click="onQuestion(lastquestion,lastindex)"
                                class="btn btn-info">
                                Last Question
                            </button>
                            <br>
                        </p>-->
                        <p v-if="this.question!='' && this.isComplete == false">
                            <button v-for="(question, index) in this.testsessionquestionsrnd"
                                v-bind:key="question"
                                v-bind:title="question"
                                v-on:click="onQuestion(question,index)"
                                class="btn btn-danger">
                                {{index+1}}
                            </button>
                            
                            <br>
                        </p>
                        <p v-if="this.question!='' && this.isComplete == false">
                            <button v-on:click="submitExam()"
                                class="btn btn-info">
                                Submit Exam
                            </button>
                            
                            <br>
                        </p>
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
            studenttests: [],
            tests: [],
            questions: [],
            selectquestions: [],
            answers: [],
            studenttestsession: [],
            studentanswers: [],
            selectedanswers: [],
            getoveralltestscores: [],
            studentid: '',
            studenttestid: '',
            studentteststatus: '',
            studenttestcgpa: '',
            studenttestscore: '',
            studenttestgrade: '',
            studentname: '',
            studentnumber: '',
            loggedstudentnumber: '',
            matricnumber: '',
            faculty: '',
            department: '',
            level: '',
            courseofstudy: '',
            photo: '',
            parenttests: [],
            gettestscores: [],
            parenttestid: '',
            parenttest: '',
            testid: '',
            test: '',
            selectedtest: '',
            score: '',
            totaltime: '',
            timeleft: '',
            questionid: '',
            previousquestionid: '',
            question: '',
            questiontype: '',
            questionimage: '',
            questionnumber: '',
            isEdit: false,
            isloggedinsuccess: false,
            isExam: false,
            isTest: false,
            isSession: false,
            errormessage: '',
            studenttestsessionid: '',
            testsessionquestions: '',
            testsessionscore: '',
            testsessionquestionslist: '',
            questionlist: '',
            testsessionquestionsrnd: [],
            testsessionstatus: '',
            testsessiontimeleft: '',
            testsessiontimecurrent: '',
            testsessionscore: '',
            testsessionansweredquestions: '',
            answeredquestions: '',
            numberofquestions: '',
            i: '',
            hours: '',
            minutes: '',
            seconds: '',
            timer: '',
            isAnswer: false,
            selectedanswerid: '',
            selectanswerid: '',
            selectscore: '',
            selectquestionid: '',
            answeroption: '',
            answerradiobuttons: '',
            firstquestion: '',
            previousquestion: '',
            nextquestion: '',
            lastquestion: '',
            index: '',
            firstindex: '',
            lastindex: '',
            displayansweredquestions: '',
            displaytotalquestions: '',
            isComplete: false
        }
    },
    /* mounted() {
        this.getAdmins()
    }, */
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
                            
                            this.isloggedinsuccess=true
                            this.studentname = this.students.studentname
                            this.matricnumber = this.students.matricnumber
                            this.faculty = this.students.faculty
                            this.department = this.students.department
                            this.photo = this.students.photo
                            this.level = this.students.level
                            this.courseofstudy = this.students.courseofstudy
                            this.loggedstudentnumber = this.students.studentnumber
                            this.studentid = this.students.studentid
                            this.getParentTests()
                        }
                        console.log(this.isloggedinsuccess)
                        this.studentnumber = ''
                    
                    },
                    error => {
                        console.error(error)
                    }
                )
            }
            
        },
        getParentTests() {
            this.isExam=false
            if (this.studentid == '') {
                this.errormessage = 'No Student Found'
            }else{
                axios.get(`http://localhost:3000/studenttest/selectstudenttestbystudentid/${this.studentid}`).then(
                result => {
                    console.log(result.data)
                    this.studenttests = result.data
                    this.errormessage = ''
                    if (this.studenttests == null) {
                        console.log("No Record Found")
                        this.errormessage = "No Test For Student Found"
                    }else{
                        console.log(this.studenttests.parenttest)
                        this.parenttest = this.studenttests.parenttest
                        this.parenttestid = this.studenttests.parenttestid
                        this.studenttestid = this.studenttests.studenttestid
                        this.studentteststatus = this.studenttests.status
                        this.studenttestcgpa = this.studenttests.cgpa
                        this.studenttestscore = this.studenttests.score
                        this.studenttestgrade = this.studenttests.grade


                        if(this.studentteststatus == 'Logged'){
                            this.errormessage = 'You have already logged in. Meet the Administrator to log you out'
                            this.isExam = false
                            this.isloggedinsuccess=false
                        }else{
                            if (this.studentteststatus == 'Activated') {
                            this.studentteststatus = 'Logged'
                            this.isExam = true
                            this.updateStudentTest()
                            this.getTests()
                        }else{
                            this.errormessage = 'You Have Not Been Activated For Exams. Meet the Administrator for Assistance.'
                            this.isExam = false
                            this.isloggedinsuccess=false
                        }
                        
                        
                        }
                        
                    }
                  
                   
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        getTests() {
            this.isTest=false
            if (this.parenttestid == '') {
                this.errormessage = 'No Examinations Found'
            }else{
                axios.get(`http://localhost:3000/tests/selecttest/${this.parenttestid}`).then(
                result => {
                    console.log(result.data)
                    this.tests = result.data
                    this.errormessage = ''
                    if (this.tests == null) {
                        console.log("No Record Found")
                        this.errormessage = "No Test For Student Found"
                    }else{
                       console.log("Test Records Found")
                    }
                  
                   
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        selectTest(testid,test,totaltime,numberofquestions) {
            this.testid = testid
            this.test = test
            this.selectedtest = test
            this.totaltime = totaltime
            console.log(this.totaltime)
            this.numberofquestions = numberofquestions
            this.isComplete = false
            this.getStudentTestSession()
             if (this.isComplete = true) {
                    this.errormessage = 'You Have Already Completed This Test'
                    console.log(this.testsessionstatus)
                }
        },
        getStudentTestSession() {
            this.isSession=false
            if (this.testid == '' || this.studentid == '') {
                this.errormessage = 'No Exam Sessions Found'
            }else{
                axios.get(`http://localhost:3000/studenttestsession/selectstudenttestsessionbystudentidandtest/${this.studentid}/${this.testid}`).then(
                result => {
                    console.log(result.data)
                    this.studenttestsession = result.data
                    this.errormessage = ''
                    if (this.studenttestsession == null || this.studenttestsession.length == 0) { // null || this.studenttestsession == []) {
                        console.log("Create Test Session")
                        this.score = 0
                        this.addNewTestSession()

                    }else{
                       console.log("Select Test Session")
                       this.studenttestsessionid = this.studenttestsession.studenttestsessionid
                       this.testid = this.studenttestsession.testid
                       this.testsessionquestions = this.studenttestsession.questions
                       this.testsessionquestionslist = this.studenttestsession.questions
                       if (this.testsessionquestionslist==null || this.testsessionquestionslist == ''){
                           console.log('No questions Found')
                       }else{
                           this.displaytotalquestions = this.testsessionquestionslist.split(',').length
                       }
                       
                       this.testsessionstatus = this.studenttestsession.status
                       this.testsessiontimeleft = this.studenttestsession.timeleft
                       this.testsessiontimecurrent = this.studenttestsession.timecurrent
                       this.testsessionscore = this.studenttestsession.score
                       this.testsessionansweredquestions = this.studenttestsession.answeredquestions
                       
                      
                       console.log(this.testsessionquestions)
                       if (this.testsessionquestions==null || this.testsessionquestions == ''){
                           console.log('Empty Questions')
                           this.emptyQuestions(this.testid, this.test)
                           this.errormessage = 'No Questions Found'
                       }else{
                           if (this.testsessionstatus == 'Completed') {
                               this.isComplete = true
                               this.errormessage = 'You Have Already Completed This Test'
                               console.log(this.testsessionstatus)
                           }else{
                               this.isComplete = false
                               console.log(this.testsessionstatus)
                               let pos = ''
                               if (this.testsessionansweredquestions==null || this.testsessionansweredquestions == ''){
                                   console.log('No answered questions')
                               }else{
                                   this.displayansweredquestions = this.testsessionansweredquestions.split(',').length
                        
                               }
                              
                               console.log('Load Questions: ', this.testsessionquestions)
                                this.LoadQuestions(this.testsessionquestions)
                           }
                           
                       }
                      

                       //console.log(this.studenttestsessionid)
                       //this.getTestSession(this.testid,this.studentid)
                    }
                  
                   
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        emptyQuestions(testid, test){
            axios.get(`http://localhost:3000/questions/selectquestionbytest/${testid}`).then(
                result => {
                    console.log(result.data)
                    this.questions = result.data
                    this.testsessionquestionslist = []
                    if (this.numberofquestions > this.questions.length) {
                        this.numberofquestions = this.questions.length
                    }
                    for (this.i=0;this.i<this.numberofquestions;this.i++){
                        console.log(this.questions[this.i].questionid)
                        this.testsessionquestionslist.push(this.questions[this.i].questionid)
                        this.testsessionquestionslist.sort(function(a, b){return 0.5 - Math.random()})
                        
                    }
                    this.testsessionquestionslist = this.testsessionquestionslist.toString()
                    this.testsessionstatus = "Started"
                    this.testsessiontimeleft = this.totaltime
                    let minutes = 0
                    let hours = 0
                    let seconds = 0
                    //console.log(this.testsessiontimeleft)
                    if(this.testsessiontimeleft > 60){
                        let minutes = this.testsessiontimeleft % 60
                        let hours = 1
                    }else{
                        minutes = this.testsessiontimeleft 
                    }
                    

                    let hour_pretty=''
                    let minute_pretty=''
                    let second_pretty=''
                    if (seconds<10){
                        second_pretty = '0' + seconds
                    }else{
                        second_pretty = seconds
                    }
                    if (minutes<10){
                        minute_pretty = '0' + minutes
                    }else{
                        minute_pretty = minutes
                    }
                    if (hours<10){
                        hour_pretty = '0' + hours
                    }else{
                        hour_pretty = hours
                    }
                    this.minutes = minutes
                    this.seconds = seconds
                    this.hours = hours
                    this.testsessiontimecurrent = this.hours + ':' + this.minutes + ':' + this.seconds
                    console.log(this.testsessionquestionslist,this.studenttestsessionid,this.testsessiontimeleft,this.testsessiontimecurrent,this.testsessionstatus)
                    this.updateTestSession()
                    this.LoadQuestions(this.testsessionquestionslist)
                },
                error => {
                    console.error(error)
                }
            )

        },
        LoadQuestions(questions){
           
           console.log(questions)
           if (questions != ''){
               let pos = questions.indexOf(",")
               if (pos >= 0) {
                   this.testsessionquestionsrnd = questions.split(",")
                   this.firstquestion = this.testsessionquestionsrnd[0]
                   this.lastquestion = this.testsessionquestionsrnd[this.testsessionquestionsrnd.length - 1]
                   this.previousquestion = this.firstquestion
                   this.nextquestion = this.testsessionquestionsrnd[1]
                   this.firstindex = 0
                    this.lastindex = this.testsessionquestionsrnd[this.testsessionquestionsrnd.length - 1]
                    this.index = 0
                   console.log(this.firstquestion,this.lastquestion,this.previousquestion,this.nextquestion)
                   this.onQuestion(this.testsessionquestionsrnd[0],0)
                   console.log(questions)
                   
                    let remainingtime = this.testsessiontimecurrent.split(":")
                    console.log(this.testsessionquestionslist)
                    
                    console.log(this.testsessionquestionsrnd)
                    this.seconds = remainingtime[2]
                    this.minutes = remainingtime[1]
                    this.hours = remainingtime[0]
                
                   this.timer == setInterval(this.TimerHandler, 1000)
               }
           }else{
               this.question = ''
               this.questionnumber = ''
               //this.questions = ''
               this.testsessionquestionsrnd = []
           }

        },
        loadAnswers(questionid) {
            //this.isTest=false
            if (questionid == '') {
                this.errormessage = 'No Question Found'
            }else{
                axios.get(`http://localhost:3000/answers/selectanswerbyquestion/${questionid}`).then(
                result => {
                    console.log(result.data)
                    this.answers = result.data
                    this.errormessage = ''
                    if (this.answers == null) {
                        console.log("No Record Found")
                        this.errormessage = "No Options For Student Found"
                    }else{
                       this.selectOptionAnswer(questionid)
                    }
                    this.answerid = ''
                   
                },
                error => {
                    console.error(error)
                }
            )
            }
            
        },
        selectOptionAnswer(questionid) {
            
            this.isSession=false
            if (this.testid == '' || this.studentid == '') {
                this.errormessage = 'No Exam Sessions Found'
            }else{
                axios.get(`http://localhost:3000/studentanswers/selectstudentanswerbyId/${this.studentid}/${questionid}`).then(
                result => {
                    console.log(result.data)
                    let studentoptionanswers = result.data
                    this.errormessage = ''
                                       
                    if (studentoptionanswers == null || studentoptionanswers.length == 0) { // null || this.studenttestsession == []) {
                        
                    }else{
                        this.answeroption = studentoptionanswers.answerid
                        console.log(this.answeroption)
                    }
                  
                   
                },
                error => {
                    console.error(error)
                }
            )
            }
            

        },
        getTestScores() {
            //this.isTest=false
            if (this.testid == '') {
                this.errormessage = 'No Tests Found'
            }else{
                axios.get(`http://localhost:3000/studentanswers/selectstudentanswerbytestId/${this.studentid}/${this.testid}`).then(
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
                    //this.onQuestion(this.questionid)
                    this.updateTestSession()
                },
                error => {
                    console.error(error)
                }
            )
            }
            
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
        selectAnswer(answerid,answer,score) {
            this.answerid = answerid
            this.answer = answer
            this.score = score
            this.isAnswer = true
            console.log(this.questionid,this.answerid,this.score)
            this.selectanswerid = this.answerid
            this.selectscore = this.score
            this.selectquestionid = this.questionid
        },
        submitExam() {
            console.log(this.questionid)
            
            //find All Scores
            this.getTestScores()
            this.errormessage = 'You Have Submitted Successfully'
            
            //Check if other exams are still on
            //Update Overall Student test scores
            this.getOverallTestScores()
             this.errormessage += 'You Have Submitted Successfully'

        },
        TimerHandler () {
            
            if (this.seconds==0) {
            

                if (this.minutes>0){
                    this.seconds=59
                    this.minutes--
                    this.testsessiontimeleft--
                }
            
                 
            }

            if (this.minutes==0) {
                
                if (this.hours>0){
                    this.minutes=59
                    this.hours--
                }
            }

            if (this.seconds>0){
                this.seconds--
                
            }
            
            
            
            //console.log(hour + " : " + min + " : " + sec)
            this.DisplayTime ()
        },
        DisplayTime () {
            let sec_pretty = this.seconds
            let min_pretty = this.minutes
            let hour_pretty = this.hours
            
            if (this.seconds < 10) {
                sec_pretty = ''
                sec_pretty = "0" + this.seconds
            }
            if (this.minutes < 10) {
                min_pretty = ''
                min_pretty = "0" + this.minutes
            }
            if (this.hours < 10) {
                hour_pretty = ''
                if (this.hours == 0){
                    this.hour_pretty = ''
                    //console.log('hours before 0 ', this.hours)
                }
                hour_pretty = "0" + this.hours
                //console.log('hours after 0 ',this.hours)
            }
            if (this.hours==0&&this.minutes==5){
                this.errormessage = 'You Have About 5 minutes Left to Complete Your Exam'
            }
            if (this.hours==0&&this.minutes==0&&this.seconds==0){
                this.errormessage = 'You Have Completed Your Exam'
            }
          
            this.testsessiontimecurrent = this.hours + ":" + this.minutes + ":" + this.seconds
            //console.log(this.testsessiontimecurrent)
        },
        onQuestion(questionid,index){
            axios.get(`http://localhost:3000/questions/selectquestion/${questionid}`).then(
                result => {
                    console.log(result.data)
                    this.selectquestions = result.data
                    this.question = this.selectquestions.question
                    this.questionid = this.selectquestions.questionid
                    this.questiontype = this.selectquestions.questiontype
                    this.questionimage = this.selectquestions.image
                    this.questionnumber = index + 1

                    if (this.index == 0) {
                        this.index = this.firstindex
                        this.previousquestion = this.firstquestion
                        this.nextquestion = this.testsessionquestionsrnd[1]
                    }else if(index == this.testsessionquestionsrnd.length - 1) {
                        this.index = this.lastindex
                        this.previousquestion = this.testsessionquestionsrnd.length - 2
                        this.nextquestion = this.lastquestion
                    }else{
                        this.previousquestion = this.testsessionquestionsrnd[index + 1]
                        this.nextquestion = this.testsessionquestionsrnd[index - 1]
                    }
                     console.log(this.firstquestion,this.lastquestion,this.previousquestion,this.nextquestion)
                    if (this.isAnswer == true) {
                        //this.deleteAnswer()
                        this.deleteAnswer()
                    }
                    this.isAnswer = false
                    this.testsessionscore = Number(this.testsessionscore) + Number(this.score)

                    console.log('Questions: ', this.testsessionquestionslist)
                    this.updateTestSession()

                    this.loadAnswers(this.questionid)


                    //this.answerid = ''
                    this.previousquestionid = this.questionid
                },
                error => {
                    console.error(error)
                }
            )

        },
        getTestSession(testid, studentid){
            
            

        },
        addNewTestSession() {
            axios.post("http://localhost:3000/studenttestsession/addstudenttestsession", {studentid: this.studentid,
                                            studentnumber: this.loggedstudentnumber,
                                            matricnumber: this.matricnumber,
                                            score: this.score,
                                            testid: this.testid})
            .then((res) => {
                
                this.getStudentTestSession(this.testid,this.studentid)
            }).catch((err) => {
                console.log(this.loggedstudentnumber)
                console.log(err)
            })
        },
        deleteAnswer() {
            
            this.isSession=false
            if (this.testid == '' || this.studentid == '') {
                this.errormessage = 'No Exam Sessions Found'
            }else{
                axios.get(`http://localhost:3000/studentanswers/selectstudentanswerbyId/${this.studentid}/${this.selectquestionid}`).then(
                result => {
                    console.log(result.data)
                    this.studentanswers = result.data
                    this.errormessage = ''

                    //Create Answered Questions
                    if (this.testsessionansweredquestions == null || this.testsessionansweredquestions.length == 0) {
                        console.log('No answered questions')
                        this.testsessionansweredquestions = this.selectquestionid
                    }else{

                        
                        console.log('Check if Question  Answered: ', this.selectquestionid, this.testsessionansweredquestions)
                        let pos = this.testsessionansweredquestions.indexOf(this.selectquestionid)
                        if (pos + 1 > 0) {
                            console.log('Question  Answered')

                        }else{
                            console.log('Question Not Answered')
                            this.testsessionansweredquestions = this.testsessionansweredquestions + ',' + this.selectquestionid
                        }
                    }
                    
                    
                    if (this.studentanswers == null || this.studentanswers.length == 0) { // null || this.studenttestsession == []) {
                        
                        this.createAnswer()

                    }else{
                        console.log(this.selectquestionid,this.selectanswerid,this.selectscore)
                        this.updateAnswer()
                    }
                  
                   
                },
                error => {
                    console.error(error)
                }
            )
            }
            

        },
        createAnswer() {
            
            //Insert Answer of Student
            if (this.answerid == '') {
                //this.errormessage = 'No Exam Sessions Found'
                console.log('No answer Found')
            }else{
                 axios.post("http://localhost:3000/studentanswers/addstudentanswer", {studentid: this.studentid,
                                                testid: this.testid,
                                                score: this.selectscore,
                                                answerid: this.selectanswerid,
                                                questionid: this.selectquestionid})
                .then((res) => {
                    console.log('Answer Created', this.answerid)
                    this.isAnswer = false
                    this.answerid = ''
                    console.log(res)
                }).catch((err) => {
                    
                    console.log(err)
                })
            }
           
        },
        updateAnswer() {
            
            //Insert Answer of Student
            if (this.answerid == '') {
                //this.errormessage = 'No Exam Sessions Found'
                console.log('No answer Found')
            }else{
                axios.put(`http://localhost:3000/studentanswers/updatestudentanswerbyid/${this.studentid}/${this.selectquestionid}`, {studentid: this.studentid,
                                                score: this.selectscore,
                                                answerid: this.selectanswerid,
                                                questionid: this.selectquestionid})
                .then((res) => {
                    console.log('Answer Updated')
                    this.isAnswer = false
                    this.answerid = ''
                    console.log(res)
                }).catch((err) => {
                    
                    console.log(err)
                })
            }
        },
        updateTestSession () {
            axios.put(`http://localhost:3000/studenttestsession/updatestudenttestsession/${this.studentid}/${this.testid}/${this.studenttestsessionid}`,
            {questions: this.testsessionquestionslist,
                status: this.testsessionstatus,
                timeleft: this.testsessiontimeleft,
                timecurrent: this.testsessiontimecurrent,
                score: this.testsessionscore,
                answeredquestions: this.testsessionansweredquestions,
                studentid: this.studentid})
            .then((res) => {
                console.log('questions: ', this.testsessionquestionslist)
                console.log('questions: ', this.testsessionansweredquestions)
                if(this.testsessionansweredquestions!=null || this.testsessionansweredquestions!=''){
                     this.displayansweredquestions = this.testsessionansweredquestions.split(',').length
                }
               
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
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
            this.studentteststatus = 'Activated'
            this.updateStudentTest()
            this.errormessage = 'You Have Successully Logged Out'
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

<style scoped>
  

    #timer {
        text-align: center;
        width: 150px;
        padding: 15px;
        color: #f3f3f3;
        background: #171717;
        border-radius: 8px 8px 0px 0px;
    }

    .test {
    margin: 0px auto;padding-top: 30px;width: 100%;
    }

    .test-left {
    width:45%; text-align:left;float:left;
    }

    .test-right {
    width:45%; text-align:right;float:left;
    }


    @media screen and (max-width: 640) {
        .left {
            width: 100%;
        }

        .test-left {
    width:100%;
    display:block;
    text-align: center;
    }

    .test-right {
        width:100%;
        display:block;
        text-align: center;
    }

    }

</style>
