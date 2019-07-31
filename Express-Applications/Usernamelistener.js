var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

const validnumber = RegExp((/^[0-9]+$/));
const validletter = RegExp((/^[A-Za-z]+$/));
var con = mysql.createConnection({
  host: "first.ckl4m0awsivc.us-east-1.rds.amazonaws.com", user: "cse17008",
  password: "oracle123",
  port: "3306",
  database: "Firstone"
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

//start your server on port 3001
app.listen(3001, () => {
  console.log('Server started');
});
