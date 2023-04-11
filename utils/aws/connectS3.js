AWS.config.update({
  region: "us-west-2",
  accessKeyId: "AKIA53K53QWGCRDKRTFT",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

module.exports = { s3 };
