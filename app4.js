var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.appendFile('1.txt', 'Hello CSE Node Js!', function (err) {
        if (err) throw err;
        res.write("SAVED");
        res.end();
    });
}).listen(8081);
console.log("server listens in http://localhost:8081/")
