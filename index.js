    const express = require('express');
    const dotenv = require('dotenv');
    const userRoutes = require('./routes/userRoutes');
    const multer = require('multer');
    const path = require('path');

    const upload = multer({ dest: 'upload/user_profile/' });
    multer({ dest: 'upload/group_profile/' });
    multer({ dest: 'upload/sub_group_profile/' });


    dotenv.config();

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/upload', express.static(path.join(__dirname, 'upload')));

    // Routes
    app.use('/api', userRoutes);
    app.use('/api', require('./routes/groupRoutes'));
    app.use('/api', require('./routes/subGroupRoutes'));


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

