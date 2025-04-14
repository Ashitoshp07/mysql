const path = require('path')
const fs = require('fs');
const Groups = require('../models/groupModel');

const BaseURL = 'http://localhost:5000';



exports.creategroup = async (req, res) => {
    try {
        const { group_name, group_created_user } = req.body;
        let group_profile_url = null;

        if (req.file) {
            group_profile_url = `${BaseURL}/upload/group_profile/${req.file.filename}`;
            console.log("Uploaded file path:", group_profile_url);
        }

        // Correct order of parameters
        const group_id = await Groups.creategroup(group_name, group_profile_url, group_created_user);

        // const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({
            message: "Group  created successfully",
            group_id,
            group_profile_url,
            // token,
        });

    } catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};



exports.getGroupById = async (req, res) => {
    try {
        const groupId = req.params.id;
        const groups = await Groups.getGroupById(groupId);
        if (!groups) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(groups);
    }
    catch (err) {
        console.error("Error in getGroupById:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}

exports.updateGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const { group_name } = req.body;
        let group_profile_url = null;

        if (req.file) {
            group_profile_url = `${BaseURL}/upload/group_profile/${req.file.filename}`;
            console.log("Uploaded file path:", group_profile_url);
        }

        const groups = await Groups.getGroupById(groupId);
        if (!groups) {
            return res.status(404).json({ message: "Group not found" });
        }

        // If old profile exists, delete the old image
        if (groups.group_profile_url) {
            const oldFileName = groups.group_profile_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'upload', 'group_profile', oldFileName);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("Old profile image deleted:", filePath);
                }
            });
        }

        await Groups.updateGroup(groupId, group_name, group_profile_url);
        res.status(200).json({ message: "Group updated successfully" });

    } catch (err) {
        console.error("Error in updateGroup:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};



exports.deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const groups = await Groups.getGroupById(groupId);
        if (!groups) {
            return res.status(404).json({ message: "Group not found" });
        }

        // If old profile exists, delete the old image
        if (groups.group_profile_url) {
            const oldFileName = groups.group_profile_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'upload', 'group_profile', oldFileName);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("Old profile image deleted:", filePath);
                }
            });
        }

        await Groups.deleteGroup(groupId);
        res.status(200).json({ message: "Group deleted successfully" });

    } catch (err) {
        console.error("Error in deleteGroup:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};