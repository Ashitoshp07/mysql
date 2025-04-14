

// const multer = require('multer');
// const path = require('path');

// // Set storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'upload/user_profile/');

//     },

//     filename: (req, file, cb) => {
//         // cb(null, `${file.originalname}`);
//         cb(null, Date.now() + "--" + file.originalname.replaceAll(' ', ''));

//     }
// });


// // File filter (optional)
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed!'), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
// });

// module.exports = upload;










const multer = require('multer');
const path = require('path');

// Set storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let Folder;
        console.log(file.fieldname)
        if (file.fieldname === 'user_profile_url') {
            Folder = './upload/user_profile/';
        } else if (file.fieldname === 'group_profile_url') {
            Folder = './upload/group_profile/';
        } else {
            return cb(new Error('Invalid field name'), false);
        }
        cb(null, Folder);
    },

    filename: (req, file, cb) => {
        const cleanFileName = Date.now() + "--" + file.originalname.replaceAll(' ', '');
        cb(null, cleanFileName);
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
