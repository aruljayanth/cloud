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
  host: "104.154.79.118", user: "cse17008",
  password: "oracle123",
  port: "3306",
  database: "innodb"
});


app.post('/', function(req , res){
  if(req.body==''){
    res.send("false");
  }
  else{
    try{
        con.query("select * from login where username=? and password=?", [req.body.username,req.body.password],function (err, result) {
          if(result.length>0){
            res.send("true");
          }
          else
          {
            res.send("false");
          }
          console.log("Database created");
          console.log(result);
        });
      }
      catch(err){
        console.log(err);
      }
    
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
