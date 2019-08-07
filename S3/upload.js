const fs = require('fs');
const AWS = require('aws-sdk');
const publicKey = 'ASIAW676XPNUW23RXXHI'; // Update the keys
const secretKey = '5YgxhsOnkGTBnRhdJjXwsIFVPZWJmKxcz3ozBstk';
const sessionToken = 'FQoGZXIvYXdzEOv//////////wEaDBat1j4qII0z7G350SKSA47HWycwuyu+eOiNEw/uBM9eg7w6c1YB047foT485oU892mm0rSRYuoDLXk3d6OJMa1GeQMv2Ee8a4oMJzAtmUUZZwSoiITgX5zndouXHR49VoYpKi4rb7sC5+Wsr6Shfu2YzhpHJ4jLCiGlgJ8+jmb90ky2KoFBqOkSJLMdkymCY2GDDQBJYK0U02DqpYzFflGOMIviVER706QlEr8zNFEaoSJ0t1DVYcw268yX9O4b+nbe8KTqT/IB2rIH8w3xl5yt0SmXcRx9uqvZmrKLsEtO9c8IdEUzEBiwWdal/lVqbyBuKADJ5JSFaoJUJcvuJVS6YYpjmJ1fDwGT8jU0zADLJn1NHKtNyMfO2OGUQeYb1noJd3fhCCSYudaugBWOBn+VC7LK/LOhw94hi2tFSxLefkwDpyxloHEW6veX9tk39gv1UYOyQg/y1WnuwnA0DztCsCzPAiZp7E4S7nqSa4HyiGSetu7WPscqSwt9tBkT3SszbOL/RMmI71nm76sjjOc6ziSsCTmBgzMuPmV4A944jCifk6zqBQ=='
const s3 = new AWS.S3(
 {accessKeyId: publicKey, secretAccessKey: secretKey, sessionToken: sessionToken}
);
const fileName = 'hello.txt';
const uploadFile = () => {
 fs.readFile(fileName, (err, data) => {
 if (err) throw err;
 const params = {
 Bucket: 'snodebucket', // pass your bucket name
 Key: 'hello.txt', // file will be saved as
 Body: JSON.stringify(data, null, 2)
 };
 s3.upload(params, function(s3Err, data) {
 if (s3Err) throw s3Err
 console.log('File uploaded successfully at ${data.Location}')
 });
 });
};
uploadFile();