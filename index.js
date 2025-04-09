const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: 'upload/' });


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

