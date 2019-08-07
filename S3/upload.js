const fs = require('fs');
const AWS = require('aws-sdk');
const publicKey = ''; // Update the keys
const secretKey = '';
const sessionToken = '';
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
