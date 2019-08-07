const AWS = require('aws-sdk');
const fs = require('fs');
const publicKey = ''; // Update the keys
const secretKey = '';
const sessionToken = '';
const s3 = new AWS.S3(
 {accessKeyId: publicKey, secretAccessKey: secretKey, sessionToken: sessionToken}
);const filePath = "text.txt"; // local file system
const bucketName = 'snodebucket';
const key = 'hello.txt'; // file in s3
const downloadFile = (filePath, bucketName, key) => {
 const params = {
 Bucket: bucketName,
 Key: key
 };
 s3.getObject(params, (err, data) => {
 if (err) console.error(err);
 fs.writeFileSync(filePath, data.Body.toString());
 console.log(`${filePath} has been created!`);
 });
};
downloadFile(filePath, bucketName, key);
