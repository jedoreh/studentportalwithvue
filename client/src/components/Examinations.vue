<template>
    <div class="hello">
        <div id="admins" class="container">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">
                        Examinations
                    </h1>
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="#/">Log Out</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/students">Students</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/administrators">Administrators</a>
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
            <div v-if="this.isExam == true">
                <div class="row">
                    
                    <div class="col-md-6 mx-auto">
                        <h3 class="text-center">
                            Manage Examinations
                        </h3>
                        
                        <form v-on:submit.prevent="addNewExam">
                            <label for="parenttest">Examination Name</label>
                            <input type="text" v-model="parenttest" id="parenttest" class="form-control" placeholder="Examination Name">
                            <label for="date">Examination Date</label>
                            <input type="text" v-model="date" id="date" class="form-control" placeholder="Examination Date">
                            <label for="instruction">Examination Instructions</label>
                            <input type="text" v-model="instruction" id="instruction" class="form-control" placeholder="Examination Instructions">
                            <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
                                Submit
                            </button>
                            <button v-else v-on:click="updateExam()" type="button" class="btn btn-primary btn-block mt-3">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <br>
                        <table class="table table-responsive">
                            <tr v-for="(parenttest) in parenttests"
                            v-bind:key="parenttest.parenttestid"
                            v-bind:title="parenttest.parenttest">
                                <td class="text-left">{{parenttest.parenttest}}<br>
                                    {{parenttest.date}}
                                <td class="text-left">{{parenttest.instruction}}</td>
                                <td class="text-right">
                                    <button class="btn btn-info" 
                                        v-on:click="editExam(parenttest.parenttest, 
                                                                parenttest.date, 
                                                                parenttest.instruction, 
                                                                parenttest.parenttestid)">
                                        Edit
                                    </button>
                                    <button class="btn btn-success" v-on:click="onTest(parenttest.parenttestid, parenttest.parenttest)">Add Test</button>
                                    <button class="btn btn-danger" v-on:click="deleteExam(parenttest.parenttestid)">Delete</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                </div>
            </div>
            <!-- Get and Manage Tests -->
            <div v-if="this.istest == true">
                <div class="row">
                    
                    <div class="col-md-6 mx-auto">
                        <h3 class="text-center">
                            Manage Tests for {{this.selectparenttest}}
                        </h3>
                        <ul class="breadcrumb">
                            <li><button v-on:click="onExam()">Back to Examinations</button></li>
                        </ul>
                        <form v-on:submit.prevent="addNewTest">
                            <label for="test">Test Name</label>
                            <input type="text" v-model="test" id="test" class="form-control" placeholder="Test Name">
                            <label for="status">Test Status</label>
                            <select id="status" v-model="status" class="form-control" placeholder="Select Status">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <label for="testinstruction">Examination Instructions</label>
                            <input type="text" v-model="testinstruction" id="testinstruction" class="form-control" placeholder="Test Instructions">
                            <label for="totaltime">Total Time</label>
                            <input type="text" v-model="totaltime" id="totaltime" class="form-control" placeholder="Total Time">
                            <label for="numberofquestions">Number of Questions</label>
                            <input type="text" v-model="numberofquestions" id="numberofquestions" class="form-control" placeholder="Number of Questions">
                            <input type="hidden" v-model="selectparenttest" id="selectparenttest">
                            <input type="hidden" v-model="selectparenttestid" id="selectparenttestid">
                            <button v-if="this.isEditTest == false" type="submit" class="btn btn-success btn-block mt-3">
                                Submit
                            </button>
                            <button v-else v-on:click="updateTest()" type="button" class="btn btn-primary btn-block mt-3">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        
                        <br>
                        <table class="table table-responsive">
                            <tr v-for="(test) in tests"
                            v-bind:key="test.testid"
                            v-bind:title="test.test">
                                <td class="text-left">{{test.test}}<br>
                                    {{test.status}}
                                <td class="text-left">{{test.instruction}}<br>
                                Number of Questions: {{test.numberofquestions}}</td>
                                <td class="text-right">
                                    <button class="btn btn-info" 
                                        v-on:click="editTest(test.test, 
                                                                test.status, 
                                                                test.instruction,
                                                                test.totaltime,
                                                                test.numberofquestions,
                                                                test.testid)">
                                        Edit
                                    </button>
                                    <button class="btn btn-success" v-on:click="onQuestion(test.testid,test.test)">Add Questions</button>
                                    <button class="btn btn-danger" v-on:click="deleteTest(test.testid)">Delete</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                </div>
            </div>
            
             <!-- Get and Manage Questions -->
            <div v-if="this.isquestion == true">
                <div class="row">
                    
                    <div class="col-md-6 mx-auto">
                        <h3 class="text-center">
                            Manage Questions for {{this.selecttest}}, {{this.selectparenttest}}
                        </h3>
                        <ul class="breadcrumb">
                            <li><button v-on:click="onExam()">Back to Examinations</button></li>
                            <li><button v-on:click="onTest(this.selectparenttestid,this.selectparenttest)">Back to Tests</button></li>
                        </ul>
                        <form v-on:submit.prevent="addNewQuestion">
                            <label for="question">Question</label>
                            <input type="text" v-model="question" id="question" class="form-control" placeholder="Question">
                            <label for="questiontype">Question Type</label>
                            <select id="questiontype" v-model="questiontype" class="form-control" placeholder="Select Question Type">
                                <option value="radio">Objective Multichoice Single Select</option>
                                <option value="checkbox">Objective Multichoice Multiple Select</option>
                                <option value="textbox">Fill Blanks</option>
                                <option value="file-upload">Submit a File</option>
                            </select>
                            <label for="image">Question Image</label>
                            <img v-bind:src="previewImage" class="uploading-image img-thumbnail" />
                            <img v-bind:src="server + '/images/' + questionimage" class="img-thumbnail" />
                            <input type="file" id="image" ref="file" class="form-control" accept="image/jpeg" @change=uploadImage>
                            <input type="text" v-model="questionimage" class="form-control" id="questionimage"  placeholder="Enter Question Image">
                            <input type="hidden" v-model="selecttest" id="selecttest">
                            <input type="hidden" v-model="selecttestid" id="selecttestid">
                            <button v-if="this.isEditQuestion == false" type="submit" class="btn btn-success btn-block mt-3">
                                Submit
                            </button>
                            <button v-else v-on:click="updateQuestion()" type="button" class="btn btn-primary btn-block mt-3">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        
                        <br>
                        <table class="table table-responsive">
                            <tr v-for="(question) in questions"
                            v-bind:key="question.questionid"
                            v-bind:title="question.question">
                                <td class="text-left">{{question.question}}<br>
                                    {{question.questiontype}}<br>
                                    <img v-bind:src="server + '/images/' + question.image" class="img-thumbnail" /></td>
                                <td class="text-right">
                                    <button class="btn btn-info" 
                                        v-on:click="editQuestion(question.question, 
                                                                question.questiontype, 
                                                                question.image,
                                                                question.questionid)">
                                        Edit
                                    </button>
                                    <button class="btn btn-success" v-on:click="onAnswer(question.questionid,question.questiontype)">Add Answers</button>
                                    <button class="btn btn-danger" v-on:click="deleteQuestion(question.questionid)">Delete</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                </div>
            </div>

             <!-- Get and Manage Answers -->
            <div v-if="this.isanswer == true">
                <div class="row">
                    
                    <div class="col-md-6 mx-auto">
                        <h3 class="text-center">
                            Question: {{this.selectquestion}} {{this.selecttest}}, {{this.selectparenttest}}
                        </h3>
                        <ul class="breadcrumb">
                            <li><button v-on:click="onExam()">Back to Examinations</button></li>
                            <li><button v-on:click="onTest(this.selectparenttestid,this.selectparenttest)">Back to Tests</button></li>
                            <li><button v-on:click="onQuestion(this.selecttestid,this.selecttest)">Back to Questions</button></li>
                        </ul>
                        <form v-on:submit.prevent="addNewAnswer">
                            <label for="answer">Answer</label>
                            <input type="text" v-model="answer" id="answer" class="form-control" placeholder="Answer">
                            <label for="score">Score</label>
                            <input type="text" v-model="score" id="score" class="form-control" placeholder="Score">
                            <label for="image">Answer Image</label>
                            <img v-bind:src="previewImage" class="uploading-image img-thumbnail" />
                            <img v-bind:src="server + '/images/' + answerimage" class="img-thumbnail" />
                            <input type="file" id="image" ref="file" class="form-control" accept="image/jpeg" @change=uploadImage>
                            <input type="text" v-model="answerimage" class="form-control" id="answerimage"  placeholder="Enter Answer Image">
                            
                            <input type="hidden" v-model="selectquestionid" id="selectquestionid">
                            <button v-if="this.isEditAnswer == false" type="submit" class="btn btn-success btn-block mt-3">
                                Submit
                            </button>
                            <button v-else v-on:click="updateAnswer()" type="button" class="btn btn-primary btn-block mt-3">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        
                        <br>
                        <table class="table table-responsive">
                            <tr v-for="(answer) in answers"
                            v-bind:key="answer.answerid"
                            v-bind:title="answer.answer">
                                <td class="text-left">
                                    <label>
                                        <input type="radio" value="answer.score" name="answer">
                                       
                                        {{answer.answer}}<br>
                                        <img v-bind:src="server + '/images/' + answer.image" class="img-thumbnail" />
                                    </label>
                                    
                                    
                                    
                                <td class="text-right">
                                    <button class="btn btn-info" 
                                        v-on:click="editAnswer(answer.answer, 
                                                                answer.score, 
                                                                answer.image,
                                                                answer.answerid)">
                                        Edit
                                    </button>
                                   
                                    <button class="btn btn-danger" v-on:click="deleteAnswer(answer.answerid)">Delete</button>
                                </td>
                            </tr>
                           
                        </table>
                    </div>
                   
                </div>
                <div class="row">
                     <div class="col-md-8 mx-auto">
                         <button v-for="(question) in testquestions"
                            v-bind:key="question.questionid"
                            v-bind:title="question.question"
                            v-on:click="onAnswer(question.questionid,question.questiontype)"
                            class="btn btn-danger">{{question.questionid}}</button>
                     </div>
                     <br>
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
            questionimage: '',
			api: { upload: "http://localhost:3000/upload",
					retrieve: "http://localhost:3000/retrieve" },
            parenttests: [],
            parenttestid: '',
            parenttest: '',
            date: '',
            instruction: '',
            isEdit: false,
            isEditTest: false,
            isEditQuestion: false,
            isEditAnswer: false,
            isExam: true,
            istest: false,
            isquestion: false,
            isanswer: false,
            previewImage: null,

            tests: [],
            test: '',
            status: '',
            testinstruction: '',
            totaltime: '',
            numberofquestions: '',
            selectparenttest: '',
            selectparenttestid: '',

            questions: [],
            question: '',
            questionid: '',
            selecttest: '',
            selecttestid: '',
            questiontype: '',
            questionimage: '',

            answers: [],
            testquestions: [],
            answer: '',
            selectquestion: '',
            selectquestionid: '',
            selectquestiontype: '',
            answerimage: '',
            score: ''
        }
    },
    mounted() {
        this.getExams()
    },
    methods: {
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
        addNewExam() {
            axios.post("http://localhost:3000/parenttests/addparenttest", {parenttest: this.parenttest,
                                            date: this.date,
                                            instruction: this.instruction})
            .then((res) => {
                this.parenttest = ''
                this.date = ''
                this.instruction = ''
                
                this.getExams()
            }).catch((err) => {
                console.log(err)
            })
        },
        editExam(parenttest,date,instruction,parenttestid) {
            this.parenttestid = parenttestid
            this.parenttest = parenttest
            this.date = date
            this.instruction = instruction
            
            this.isEdit = true
        },
        updateExam () {
            axios.put(`http://localhost:3000/parenttests/updateparenttest/${this.parenttestid}`,
            {parenttest: this.parenttest,
                date: this.date,
                instruction: this.instruction})
            .then((res) => {
                this.parenttest = ''
                this.date = ''
                this.instruction = ''
                
                this.getExams()
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        deleteExam(parenttestid){
            axios.delete(`http://localhost:3000/parenttests/deleteparenttest/${parenttestid}`)
            .then((res) => {
                this.parenttest = ''
                this.date = ''
                this.instruction = ''
                
                this.getExams()
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        onTest(parenttestid, parenttest){
            this.isExam = false
            this.istest = true
            this.isquestion = false,
            this.isanswer = false
            this.selectparenttestid = parenttestid
            this.selectparenttest = parenttest
            axios.get(`http://localhost:3000/tests/selecttest/${parenttestid}`).then(
                result => {
                    console.log(result.data)
                    this.tests = result.data
                    

                },
                error => {
                    console.error(error)
                }
            )

        },
        onExam(){
            this.isExam = true,
            this.istest = false,
            this.isquestion = false,
            this.isanswer = false
        },
        addNewTest() {
            axios.post("http://localhost:3000/tests/addtest", {test: this.test,
                                            instruction: this.testinstruction,
                                            status: this.status,
                                            parenttest: this.selectparenttest,
                                            parenttestid: this.selectparenttestid,
                                            totaltime: this.totaltime,
                                            numberofquestions: this.numberofquestions})
            .then((res) => {
                this.test = ''
                this.status = ''
                this.testinstruction = ''
                this.totaltime = ''
                this.numberofquestions = ''
                this.isEditTest = false
                this.onTest(this.selectparenttestid,this.selectparenttest)
            }).catch((err) => {
                console.log(err)
            })
        },
        editTest(test,status,instruction,totaltime,numberofquestions,testid) {
            this.testid = testid
            this.test = test
            this.status = status
            this.testinstruction = instruction
            this.totaltime = totaltime
            this.numberofquestions = numberofquestions
            this.isEditTest = true
            console.log(this.testid)
        },
        updateTest () {
            axios.put(`http://localhost:3000/tests/updatetest/${this.testid}`,
            {test: this.test,
                status: this.status,
                instruction: this.testinstruction,
                totaltime: this.totaltime,
                numberofquestions: this.numberofquestions})
            .then((res) => {
                this.test = ''
                this.status = ''
                this.testinstruction = ''
                this.totaltime = ''
                this.numberofquestions = ''
                this.isEditTest = false
                this.onTest(this.selectparenttestid,this.selectparenttest)
                console.log(res)
                //console.log(this.isEditTest)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        deleteTest(testid){
            axios.delete(`http://localhost:3000/tests/deletetest/${testid}`)
            .then((res) => {
                 this.test = ''
                this.status = ''
                this.testinstruction = ''
                this.totaltime = ''
                this.numberofquestions = ''
                this.onTest(this.selectparenttestid,this.selectparenttest)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        onQuestion(testid, test){
            this.isExam = false
            this.istest = false
            this.isquestion = true
            this.isanswer = false
            this.ised = false
            this.selecttestid = testid
            this.selecttest = test
            axios.get(`http://localhost:3000/questions/selectquestionbytest/${testid}`).then(
                result => {
                    console.log(result.data)
                    this.questions = result.data
                    

                },
                error => {
                    console.error(error)
                }
            )

        },
        addNewQuestion() {
            axios.post("http://localhost:3000/questions/addquestion", {question: this.question,
                                            image: this.questionimage,
                                            questiontype: this.questiontype,
                                            test: this.selecttest,
                                            testid: this.selecttestid})
            .then((res) => {
                this.question = ''
                this.questionimage = ''
                this.questiontype = ''
               
                this.isEditQuestion = false
                this.onQuestion(this.selecttestid,this.selecttest)
            }).catch((err) => {
                console.log(err)
            })
        },
        editQuestion(question,questiontype,image,questionid) {
            this.questionid = questionid
            this.question = question
            this.questiontype = questiontype
            this.questionimage = image
           
            this.isEditQuestion = true
        },
        updateQuestion () {
            axios.put(`http://localhost:3000/questions/updatequestion/${this.questionid}`,
            {question: this.question,
                image: this.questionimage,
                questiontype: this.questiontype,
                test: this.selecttest,
                testid: this.selecttestid})
            .then((res) => {
                this.question = ''
                this.questionimage = ''
                this.questiontype = ''
                
                this.isEditQuestion = false
                this.onQuestion(this.selecttestid,this.selecttest)
                console.log(res)
                //console.log(this.isEditTest)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        deleteQuestion(questionid){
            axios.delete(`http://localhost:3000/questions/deletequestion/${questionid}`)
            .then((res) => {
                this.question = ''
                this.questiontype = ''
                this.questionimage = ''
               
                this.onQuestion(this.selecttestid,this.selecttest)
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
					this.questionimage = image.name
                    if (this.isanswer==true) {
                        this.answerimage = image.name
                    }else{
                        this.questionimage = image.name
                    }
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
            this.image = ''
		/* 	try {
				axios.post("http://localhost:3000/upload", formData)
				console.log('Image Uploaded')
				console.log(file)
			}
			catch(err) {
				console.log(err)
			} */
        },
        onAnswer(questionid, questiontype){
            this.isExam = false
            this.istest = false
            this.isquestion = false
            this.isanswer = true
            this.isEditAnswer = false
            this.selectquestionid = questionid
            this.selectquestiontype = questiontype
            axios.get(`http://localhost:3000/answers/selectanswerbyquestion/${questionid}`).then(
                result => {
                    console.log(result.data)
                    this.answers = result.data
                   
                },
                error => {
                    console.error(error)
                }
            )
            this.getquestionnumbers(this.selecttestid)
        },
        getquestionnumbers(testid){
              axios.get(`http://localhost:3000/questions/selectquestionbytest/${testid}`).then(
                result => {
                    console.log(result.data)
                    this.testquestions = result.data
                    

                },
                error => {
                    console.error(error)
                }
            )
        },
        addNewAnswer() {
            axios.post("http://localhost:3000/answers/addanswer", {answer: this.answer,
                                            image: this.answerimage,
                                            score: this.score,
                                            questionid: this.selectquestionid})
            .then((res) => {
                this.answer = ''
                this.answerimage = ''
                this.score = ''
               
                this.isEditAnswer = false
                this.onAnswer(this.selectquestionid,this.selectquestiontype)
            }).catch((err) => {
                console.log(err)
            })
        },
        editAnswer(answer,score,image,answerid) {
            this.answerid = answerid
            this.answer = answer
            this.score = score
            this.answerimage = image
            
            this.isEditAnswer = true
        },
        updateAnswer () {
            axios.put(`http://localhost:3000/answers/updateanswer/${this.answerid}`,
            {answer: this.answer,
                image: this.answerimage,
                score: this.score,
                questionid: this.selectquestionid})
            .then((res) => {
                this.answer = ''
                this.answerimage = ''
                this.score = ''
                
                this.isEditanswer= false
                this.onAnswer(this.selectquestionid,this.selectquestiontype)
                console.log(res)
                //console.log(this.isEditTest)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        deleteAnswer(answerid){
            axios.delete(`http://localhost:3000/answers/deleteanswer/${answerid}`)
            .then((res) => {
                this.answer = ''
                this.score = ''
                this.answerimage = ''
               
                this.onAnswer(this.selectquestionid,this.selectquestiontype)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
