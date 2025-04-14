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
        const { user_name, user_contact, user_dob } = req.body;
        let user_profile_url = null;

        if (req.file) {
            user_profile_url = `${BaseURL}/upload/user_profile/${req.file.filename}`;
            console.log("Uploaded file path:", user_profile_url);
        }

        // Correct order of parameters
        const userId = await User.createUser(user_name, user_contact, user_profile_url, user_dob);

        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({
            message: "User created successfully",
            userId,
            user_profile_url,
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


exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { user_name, user_contact, user_dob } = req.body;
        let user_profile_url = null;

        if (req.file) {
            user_profile_url = `${BaseURL}/upload/user_profile/${req.file.filename}`;
            console.log("Uploaded file path:", user_profile_url);
        }

        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If old profile exists, delete the old image
        if (user.user_profile_url) {
            const oldFileName = user.user_profile_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'upload', 'user_profile', oldFileName);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("Old profile image deleted:", filePath);
                }
            });
        }

        await User.updateUser(userId, user_name, user_contact, user_profile_url, user_dob);
        res.status(200).json({ message: "User updated successfully" });

    } catch (err) {
        console.error("Error in updateUser:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};



exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Delete the profile image if it exists
        if (user.user_profile_url) {
            console.log("User profile URL:", user.user_profile_url);
            const filePath = path.join(__dirname, '../upload/user_profile', user.user_profile_url.split('/').pop());

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






