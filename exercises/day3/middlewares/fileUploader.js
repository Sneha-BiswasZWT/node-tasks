const multer = require("multer");
const fs = require("fs");
const path = require("path");


// Create the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder); // Create the folder if it doesn't exist
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`);
  },

});

function validateFileType(file, cb){
    const filetypes = /jpeg|jpg|png|Heic/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if(mimetype && extname){
      return cb(null, true);
    } else {
        return cb(new Error("Only Images are allowed (jpeg, jpg, png)"), false);
    }
  }

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 2MB file size limit
  fileFilter: function (_req, file, cb) {
    validateFileType(file, cb);
  },
}).single("Image");

function fileUploader(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}

module.exports = { fileUploader };
