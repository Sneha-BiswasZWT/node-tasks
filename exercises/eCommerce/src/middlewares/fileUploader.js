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
    return cb(
      new Error("Only Images are allowed (jpeg, jpg, png, heic)"),
      false
    );
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
    return cb(
      new Error("Only pdfs/text/docs are allowed (pdf, doc, docx, txt)"),
      false
    );
  }
}
// Multer configuration for images
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 2MB file size limit
  fileFilter: function (_req, file, cb) {
    validateFileTypeImage(file, cb);
  },
}).single("image");

function imageUploader(req, res, next) {
  uploadImage(req, res, (err) => {
    if (err) {
      return handleMulterError(err, res);
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
      return handleMulterError(err, res);
    }
    next();
  });
}

function handleMulterError(err, res) {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(413).json({
          error: "File size too large! Max allowed size is 2MB for images.",
        });
      case "LIMIT_UNEXPECTED_FILE":
        return res
          .status(400)
          .json({ error: err.message || "Unexpected file type uploaded." });
      default:
        return res.status(400).json({ error: "File upload failed." });
    }
  } else if (err) {
    return res
      .status(500)
      .json({ error: "Internal server error during file upload." });
  }
}

module.exports = { imageUploader, pdfUploader };
