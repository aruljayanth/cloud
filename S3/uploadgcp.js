const {Storage} = require('@google-cloud/storage');



const GOOGLE_CLOUD_PROJECT_ID = ''; // Replace with your project ID
  const GOOGLE_CLOUD_KEYFILE = ''; // Replace with the path to the downloaded private key
// Creates a client
const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
  });


async function uploadfile()
{
await storage.bucket('').upload('./hello.txt', {
  // Support for HTTP requests made with Accept-Encoding: gzip
  gzip: true,
  // By setting the option destination, you can change the name of the
  // object you are uploading to a bucket.
  metadata: {
    // Enable long-lived HTTP caching headers
    // Use only if the contents of the file will never change
    // (If the contents will change, use cacheControl: 'no-cache')
    cacheControl: 'public, max-age=31536000',
  },
});
}
uploadfile();