//npm stuff
//Import the Firebase SDK for Google Cloud Functions
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const Vision = require('@google-cloud/vision');
const vision = new Vision();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
//Import and Initialize the Firebase Admin SDK
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Blurs uploaded images that are flagged as Adult or Violence.
exports.blurOffensiveImages = functions.storage.object().onChange(event => {
  const object = event.data;
  // Exit if this is a deletion or a deploy event.
  if (object.resourceState === 'not_exists') {
    return console.log('This is a deletion event.');
  } else if (!object.name) {
    return console.log('This is a deploy event.');
  }

  const image = {
    source: {imageUri: `gs://${object.bucket}/${object.name}`}
  };

  // Creates a client
  const client = vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
  // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

  // Performs label detection on the gcs file
  client
    .labelDetection(`gs://${bucketName}/${fileName}`)
    .then(results => {
      const labels = results[0].labelAnnotations;
      console.log('Labels:');
      labels.forEach(label => console.log(label));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

//   // Check the image content using the Cloud Vision API.
//   return vision.safeSearchDetection(image).then(batchAnnotateImagesResponse => {
//     const safeSearchResult = batchAnnotateImagesResponse[0].safeSearchAnnotation;
//     const Likelihood = Vision.types.Likelihood;
//     if (Likelihood[safeSearchResult.adult] >= Likelihood.LIKELY ||
//         Likelihood[safeSearchResult.violence] >= Likelihood.LIKELY) {
//       console.log('The image', object.name, 'has been detected as inappropriate.');
//       return blurImage(object.name, object.bucket);
//     } else {
//       console.log('The image', object.name,'has been detected as OK.');
//     }
//   });
// });

