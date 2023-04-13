const fs = require("fs");
const multer = require("multer");
const { uploadImage } = require("../utils/uploadImage");
const { s3 } = require("../utils/s3");
const express = require("express");
const router = express.Router();

// Multer middle ware that handles form files by uploading them onto server
// Set destination folder for uploaded file from form
const upload = multer({ dest: "uploads/" });

// @desc Uploads file briefly to server then uploads it to S3 Bucket
// @route /api/s3
// @method POST

router.post("/", upload.single("file"), (req, res) => {
  // Read uploaded file using req.path
  const { filename } = req.file;
  const fileContent = fs.readFileSync(req.file.path);

  // Upload image onto S3 using read file
  uploadImage(s3, filename, fileContent, (err, data) => {
    // Remove file from server
    fs.unlinkSync(req.file.path, { recursive: true, force: true });

    // Send back URL for the image on success
    res.status(200).json({
      success: true,
      data: { filename: data.Location },
    });
  });
});

module.exports = router;
