const path = require('path')
const fs = require('fs');
const Groups = require('../models/groupModel');
const ApiResponse = require('../config/response/apiresponse'); 

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
            group_profile_url,
            group_name
    
            // token,
        });

    } catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};



exports.getGroupByUser = async (req, res) => {
    try {
        const userName = req.params.user_name;
        const groups = await Groups.getGroupByUserName(userName);
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


exports.getGroupById = async (req, res) => {
    try {
        const groupName = req.params.group_name;
        const groups = await Groups.getGroupById(groupName);
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

exports.getGroupMember = async (req, res) => {
    try {
        const groupName = req.params.group_name;
        const groups = await Groups.getGroupMember(groupName);
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

exports.allocateMembers = async (req, res) => {
    try {
        const { group_name, user_contacts } = req.body;

        if (!group_name || !user_contacts || !Array.isArray(user_contacts) || user_contacts.length === 0) {
            return res.status(400).json({ error: "Missing or invalid group_name or user_contacts" });
        }

        await Groups.allocateMember(group_name, user_contacts);

        const userInfo = await Groups.getAllocatedUserInfo(group_name, user_contacts);

        res.status(200).json({ message: "Users allocated successfully", users: userInfo });
    } catch (err) {
        console.error("Error in allocating members:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


exports.deallocateMembers = async (req, res) => {
    try {
        const { group_name, user_contacts } = req.body; 

        if (!group_name || !user_contacts || user_contacts.length === 0) {
            return res.status(400).json({ error: "Missing group_name or user_names" });
        }

        const result = await Groups.deallocateMember(group_name, user_contacts);
        res.json(result);
    } catch (err) {
        console.error("Error in deallocating members:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};



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