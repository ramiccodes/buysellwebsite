const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
];

// Checks if Image file type is an image, returns boolean
export const isImageFile = (file) => allowedMimeTypes.includes(file.type);
