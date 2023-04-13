// handles the upload logic, and connects to S3
const uploadImage = (s3, name, file, callback) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: name,
    Body: file,
    ContentType: file.type,
  };
  s3.upload(params, callback);
};

module.exports = { uploadImage };
