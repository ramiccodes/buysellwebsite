const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
];

// Checks if Image file type is an image, returns boolean
const isImageFile = (file) => allowedMimeTypes.includes(file.type);

module.exports = {isImageFile}
