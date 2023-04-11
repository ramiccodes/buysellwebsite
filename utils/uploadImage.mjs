// handles the upload logic, and connects to S3
export const uploadImage = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading image:", err);
    } else {
      console.log("Image successfully uploaded:", data.Location);
    }
  });
};
