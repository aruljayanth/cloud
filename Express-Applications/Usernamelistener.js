var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var busboy = require('connect-busboy');
const AWS = require('aws-sdk');
const zipc = require('zipcodes');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(busboy());

const validnumber = RegExp((/^[0-9]+$/));
const validletter = RegExp((/^[A-Za-z]+$/));
const publicKey = 'ASIAW676XPNUXSJY4Q2P'; // Update the keys
const secretKey = 'xFyKOe7X9vtohzjT2nN36mlOSJm9jRobloxgmOFI';
const sessionToken = 'FQoGZXIvYXdzEAQaDBOhqt/frMG8YwXW4SL8BAnUvxWAWntEfjHY874I1pBRbxruEUDKgvhbWSHO3f2aftMS/KbjERJqZpnUMXEdry/+S8uZWd0WgrJLrXtFTXprtfif6eBZ9YXI7Q5Z6fWNEow/2b5a2XJAOfhXa35c5maX1Ez8bgofo9yJ+UrRG+CMGqVg7nHTUJ4D/WXXbHgRnG7js3RUTRhg+e2F9DP/l8kMRvP2JGjxJ1eAron7fWbKhSjTtQ8eggLn9ZXV3sDuthLpfOg6fsHw6S7iCjm6uhdKHZkDe8GvBPs0QuZsITywnJXXIs2TxEI+CMJIE9MtzaLUlTbhIdtjpKexwp3faV2Ym3j0ob48Q0uKelTsSQHyqgJieEiu7KUTGtzdJNOUESG18qXEIbClKDJPTD1SLGAF83BT6U3aT2pt/ErN292XEqOg9Qc/GRYR5inZx8fPlQzpwwsheEEf4QjDWaHoxARtmGSByVu3Cb2Q7TS1ZCwWwyr+JOnnMtp9gpN63ajQ5z9y5ACmIy2k8oUFAttPoEcizuRHQKiyQZuq72OKiKSKV1WLNPDkS82pR+HGuHULs85gQr9MOzv1f1QM6w/q7gyyXGUMF/pF4WgdFmXSs0XndSgAesLGPn/H5TMTCP1U0ZDhRR8eat5E/oQb+0kyeZlWTdZIUqG3n5ZhUor/zQI42Gi9Qtf29GbjlyVC8MlcUK0Czab7yRkLSkW3IkbmmrJY8vSoI6AsgupUkt74vC+57I+2mR3kkEyLX/xwOLgWS17RVy6oi26+mdJ/9hFSJY48bbWAV7Eh4bMqF5gRIInYZWkX8RIU8XlnL/upS01TlZN7PExCg/ePIxqOTUgqSJoJ6U1LkPfwJcSwJCjX6unqBQ==';
const s3 = new AWS.S3(
 {accessKeyId: publicKey, secretAccessKey: secretKey, sessionToken: sessionToken}
);

var con = mysql.createConnection({
  host: "database-1.ckl4m0awsivc.us-east-1.rds.amazonaws.com", user: "cse17008",
  password: "oracle123",
  port: "3306",
  database: "innodb"
});




app.post('/', function(req , res){
      if((req.body.productname==="")||(req.body.zipcode==="")||(req.body.phone==="")){
        res.send("false");
      }
      else{
        fs.appendFile('mynamefile.txt',JSON.stringify(req.body),function (err){
          if (err) throw err;
          console.log('saved!!!');
        });
        var hill=zipc.lookup(req.body.zipcode);
        con.query("insert into houses values(?,?,?,?)", [req.body.house,req.body.hname,req.body.zipcode,hill.city],function (err, result) {
          console.log("Database created");
          console.log(result);
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

app.post('/zip',function(req , res){
  res.send(validnumber.test(req.body.val)&&(req.body.val.length==5)?"true":"false")
})

app.post('/fileupload', function(req, res) {
    var fstream,responce=false;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        const params = {
          Bucket: 'aruljayanth',
          Key: (filename),
          Body: file
        };
        s3.upload(params, function(s3Err, data) {
          if (s3Err) {
              console.log("Error uploading data: ",s3Err);
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
