var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var busboy = require('connect-busboy');
const AWS = require('aws-sdk');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(busboy());

const validnumber = RegExp((/^[0-9]+$/));
const validletter = RegExp((/^[A-Za-z]+$/));
const publicKey = ''; // Update the keys
const secretKey = '';
const sessionToken = '';
const s3 = new AWS.S3(
 {accessKeyId: publicKey, secretAccessKey: secretKey, sessionToken: sessionToken}
);

var con = mysql.createConnection({
  host: "", user: "cse17008",
  password: "oracle123",
  port: "3306",
  database: "innodb"
});


app.post('/', function(req , res){
  console.log(req.body.firstname);
  if(req.body==''){
    res.send("false");
  }
  else{
    fs.appendFile('mynamefile.txt',JSON.stringify(req.body),function (err){
      if (err) throw err;
      console.log('saved!!!');
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      try{
        con.query("insert into user values(?,?,?,?)", [req.body.firstname,req.body.middlename,req.body.lastname,req.body.age],function (err, result) {
          console.log("Database created");
          console.log(result);
        });
      }
      catch(err){
        console.log(err);
      }
      finally{
        con.end();
      }
      });
    res.send('true');
  }
})

app.post('/letters',function(req , res){
  res.send(validletter.test(req.body.val)?"true":"false")
})

app.post('/numbers',function(req , res){
  res.send(validnumber.test(req.body.val)?"true":"false")
})

app.post('/fileupload', function(req, res) {
    var fstream,responce=false;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        const params = {
          Bucket: '',
          Key: (filename),
          Body: file
        };
        s3.upload(params, function(s3Err, data) {
          if (s3Err) {
              console.log("Error uploading data: ", perr);
            } else {
              console.log("Successfully uploaded data");
            }
        });
        // fstream = fs.createWriteStream("/Users/yogeshm/Documents/CloudCourse/Express-Applications/"+filename);
        // file.pipe(fstream);

        responce=true;
    });
    req.busboy.on('finish', function () {
        res.send(responce);
    });

})
app.post('/checkfile',function(req , res){
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      console.log(filename);
      res.send(true);
  });
  req.busboy.on('finish', function () {
      res.send(false);
  });

})

//start your server on port 3001
app.listen(3001, () => {
  console.log('Server started');
});
