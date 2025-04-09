

const multer = require('multer');
const path = require('path');

// Set storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // Make sure this folder exists
    },

    filename: (req, file, cb) => {
        // cb(null, `${file.originalname}`);
        cb(null, Date.now() + "--" + file.originalname.replaceAll(' ', ''));

    }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;

