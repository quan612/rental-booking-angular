const multer = require("multer");

const ALLOWED_FORMAT = ["image/jpeg", "image/png", "image/jpg"];
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not supported format"), false);
    }
  },
});

module.exports = upload;
