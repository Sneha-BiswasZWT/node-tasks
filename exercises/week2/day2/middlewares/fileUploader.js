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
    // Create a unique filename by appending the timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Validate file type for images
function validateFileTypeImage(file, cb) {
  const filetypes = /jpeg|jpg|png|heic/; 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Only Images are allowed (jpeg, jpg, png, heic)"), false);
  }
}

// Validate file type for pdfs
function validateFileTypepdf(file, cb) {
  const filetypes = /pdf|doc|docx|txt/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Only pdfs/text/docs are allowed (pdf, doc, docx, txt)"), false);
  }
}
// Multer configuration for images
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 2MB file size limit
  fileFilter: function (_req, file, cb) {
    validateFileTypeImage(file, cb);
  },
}).single("Image");

function imageUploader(req, res, next) {
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}

// Multer configuration for pdfs
const uploadPdf = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB file size limit
  fileFilter: function (_req, file, cb) {
    validateFileTypepdf(file, cb);
  },
}).single("File");

function pdfUploader(req, res, next) {
  uploadPdf(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}

module.exports = { imageUploader, pdfUploader };
