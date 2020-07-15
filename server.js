var express = require("express")
var bodyParser = require("body-parser")
const multer = require("multer")

var studentanswers = require("./routes/studentanswers")
var studenttestsession = require("./routes/studenttestsession")
var admin = require("./routes/admin")
var studenttest = require("./routes/studenttest")
var tests = require("./routes/tests")
var parenttests = require("./routes/parenttest")
var answers = require("./routes/answers")
var questions = require("./routes/questions")
var students = require("./routes/students")
var cors = require("cors")

var port = process.env.PORT || 3000

var app = express()
app.use(cors())

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

const upload = multer({
  dest: './client/public/images',
  fileFilter,
  limits: {
    fileSize: 500000000
  }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'))
//controllers
const ImageController = require("./controllers/imageController")

app.post("/upload", ImageController.uploadImage)
app.get("/retrieve", ImageController.retrieveImages)
app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    console.log('Only images are allowed')
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    console.log('Allowed file size is 500KB')
    res.status(422).json({ error: 'Allowed file size is 500KB' });
    return;
  }
});

app.use("/studentanswers", studentanswers)
app.use("/studenttestsession", studenttestsession)
app.use("/admin", admin)
app.use("/studenttest", studenttest)
app.use("/tests", tests)
app.use("/parenttests", parenttests)
app.use("/students", students)
app.use("/questions", questions)
app.use("/answers", answers)

app.listen(port, function() {
    console.log('Server started on port ' + port)
})
