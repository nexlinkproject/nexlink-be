const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');

const bucketName = 'user-storage-nexlink';

const storage = new Storage();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1000 * 1000,
    },
  });

const uploadToGoogleCloud = async (file) => {
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(`profile_pictures/${uuidv4()}-${file.originalname}`);
    const blobStream = blob.createWriteStream();
  
    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => reject(err));
  
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        resolve(publicUrl);
      });
  
      blobStream.end(file.buffer);
    });
  };

module.exports = {
  upload,
  uploadToGoogleCloud,
};