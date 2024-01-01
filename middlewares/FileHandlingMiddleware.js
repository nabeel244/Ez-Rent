// middleware/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.memoryStorage();



// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([
    { name: 'image', maxCount: 1 }, // For single image
    { name: 'images', maxCount: 10 } // For multiple images, max 10 files
]); 


// Check file type
function checkFileType(file, cb) {
    // Allowed file types
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


module.exports = upload;