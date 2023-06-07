const multer = require("multer");

exports.formats = {
  imageFormats: ["image/jpg", "image/jpeg", "image/png", "image/webp"],
  videoFormats: ["video/mp4", "video/avi", "video/mkv", "video/flv","video/x-msvideo"],
};

exports.multerData = (format) => {
  const fileFilter = (req, file, cb) => {
    if (!format.includes(file.mimetype)) {
      return cb(new Error("invalid- extension", { cause: 400 }), false);
    }
    return cb(null, true);
  };

  const storage = multer.diskStorage({});

  const upload = multer({ fileFilter, storage });
  return upload;
};
