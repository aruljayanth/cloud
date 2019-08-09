const {Storage} = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = ''; // Replace with your project ID
  const GOOGLE_CLOUD_KEYFILE = ''; // Replace with the path to the downloaded private key
// Creates a client
const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
  });


async function downloadfile()
{
  const option={
    destination:'text.txt'
  }
await storage.bucket('').file('hello.txt').download(option);

}
downloadfile();