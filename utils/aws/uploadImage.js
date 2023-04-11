// handles the upload logic, and connects to S3
const uploadImage = (file) => {
  const params = {
    Bucket: "greglist",
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

module.exports = { uploadImage };
