const AWS = require("aws-sdk");

AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
});

export const s3 = new AWS.S3();
