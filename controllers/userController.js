const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const path = require('path')
const fs = require('fs');

const BaseURL = 'http://localhost:5000';



exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { user_name, user_contact, dob } = req.body;
        let profile_url = null;

        if (req.file) {
            profile_url = `${BaseURL}/uploads/${req.file.filename}`;
            console.log("Uploaded file path:", profile_url);
        }

        // Correct order of parameters
        const userId = await User.createUser(user_name, user_contact, profile_url, dob);

        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({
            message: "User created successfully",
            userId,
            profile_url,
            token,
        });

    } catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        console.error("Error in getUserById:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}









exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Delete the profile image if it exists
        if (user.profile_url) {
            console.log("User profile URL:", user.profile_url);
            const filePath = path.join(__dirname, '../upload', user.profile_url.split('/').pop());

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("File deleted successfully:", filePath);
                }
            });
        }
        await User.deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }

}



// exports.deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id;

//         // Optionally fetch the user only to delete the image
//         const profile_url = await User.getUserProfileUrl(userId); // custom lightweight query

//         // Delete the profile image if it exists
//         if (profile_url) {
//             const filePath = path.join(__dirname, '../uploads', profile_url.split('/').pop());
//             fs.unlink(filePath, (err) => {
//                 if (err) {
//                     console.error("Error deleting file:", err);
//                 } else {
//                     console.log("File deleted successfully:", filePath);
//                 }
//             });
//         }

//         const result = await User.deleteUser(userId); // assume it returns affectedRows or similar
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "User not found or already deleted" });
//         }

//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (err) {
//         console.error("Error in deleteUser:", err);
//         res.status(500).json({ error: "Internal Server Error", details: err.message });
//     }
// };



