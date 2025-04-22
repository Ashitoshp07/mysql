const path = require('path')
const fs = require('fs');
const sub_group = require('../models/subGroupModel');


const BaseURL = 'http://localhost:5000';





exports.createsubGroup = async (req, res) => {
    try {
        const { subgroup_name, group_name, group_id, user_name } = req.body;
        let subgroup_profile_url = null;

        if (req.file) {
            subgroup_profile_url = `${BaseURL}/upload/sub_group_profile/${req.file.filename}`;
            console.log("Uploaded file path:", subgroup_profile_url);
        }

        // Correct order of parameters
        const subgroup_id = await sub_group.createsubGroup(subgroup_name, subgroup_profile_url, group_name, group_id, user_name);

        // const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({
            message: "subGroup  created successfully",
            subgroup_id,
            subgroup_profile_url,
            group_name
            // token,
        });

    } catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


exports.getSubGroupMember = async (req, res) => {
    try {
        const group_name = req.params.group_name;
        const subgroup_name = req.params.subgroup_name;

        const sub_Group = await sub_group.getSubGroupMember(group_name,subgroup_name);
        if (!sub_Group) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(sub_Group);
    }
    catch (err) {
        console.error("Error in getsubGroupById:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}


exports.getsubGroupById = async (req, res) => {
    try {
        const subgroup_id = req.params.id;
        const sub_Group = await sub_group.getsubGroupById(subgroup_id);
        if (!sub_Group) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(sub_Group);
    }
    catch (err) {
        console.error("Error in getsubGroupById:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}

exports.getsubGroupByGroup = async (req, res) => {
    try {
        const { group_name, user_name } = req.query;

 if (!group_name || !user_name) {
        return res.status(400).json({ error: "Missing group_name or user_name in query" });
    }
    
    const sub_Groups = await sub_group.getsubGroupByGroup(group_name,user_name);
        if (!sub_Groups) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(sub_Groups);
    }
    catch (err) {
        console.error("Error in getsubGroupById:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}



// exports.updatesubGroup = async (req, res) => {
//     try {
//         const subgroup_id = req.params.id;
//         const { subgroup_name } = req.body;
//         let subgroup_profile_url = null;

//         if (req.file) {
//             subgroup_profile_url = `${BaseURL}/upload/sub_group_profile/${req.file.filename}`;
//             console.log("Uploaded file path:", subgroup_profile_url);
//         }

//         const subgroupData = await sub_group.getsubGroupById(subgroup_id);
//         if (!subgroupData) {
//             return res.status(404).json({ message: "subGroup not found" });
//         }

//         // If old profile exists, delete the old image
//         if (sub_group.subgroup_profile_url) {
//             const oldFileName = sub_group.subgroup_profile_url.split('/').pop();
//             const filePath = path.join(__dirname, '..', 'upload', 'sub_group_profile', oldFileName);

//             fs.unlink(filePath, (err) => {
//                 if (err) {
//                     console.error("Error deleting file:", err);
//                 } else {
//                     console.log("Old profile image deleted:", filePath);
//                 }
//             });
//         }

//         await sub_group.updatesubGroup(subgroup_id, subgroup_name, subgroup_profile_url);
//         res.status(200).json({ message: "Group updated successfully" });

//     } catch (err) {
//         console.error("Error in updatesubGroup:", err);
//         res.status(500).json({ error: "Internal Server Error", details: err.message });
//     }
// };



exports.updatesubGroup = async (req, res) => {
    try {
        const subgroup_id = req.params.id;
        const { subgroup_name } = req.body;
        let subgroup_profile_url = null;

        if (req.file) {
            subgroup_profile_url = `${BaseURL}/upload/sub_group_profile/${req.file.filename}`;
            console.log("Uploaded file path:", subgroup_profile_url);
        }

        const subgroupData = await sub_group.getsubGroupById(subgroup_id);
        if (!subgroupData) {
            return res.status(404).json({ message: "subGroup not found" });
        }

        // Corrected: check from subgroupData not sub_group
        if (subgroupData.subgroup_profile_url) {
            const oldFileName = subgroupData.subgroup_profile_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'upload', 'sub_group_profile', oldFileName);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("Old profile image deleted:", filePath);
                }
            });
        }

        await sub_group.updatesubGroup(subgroup_id, subgroup_name, subgroup_profile_url);
        res.status(200).json({ message: "subGroup updated successfully" });

    } catch (err) {
        console.error("Error in updatesubGroup:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

exports.deletesubGroupbyId = async (req, res) => {
    try {
        const subgroup_id = req.params.id;
        const subgroupData = await sub_group.getsubGroupById(subgroup_id);  // <-- renamed variable

        if (!subgroupData) {
            return res.status(404).json({ message: "subGroup not found" });
        }

        // If old profile exists, delete the old image
        if (subgroupData.subgroup_profile_url) {
            const oldFileName = subgroupData.subgroup_profile_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'upload', 'sub_group_profile', oldFileName);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("Old profile image deleted:", filePath);
                }
            });
        }

        await sub_group.deletesubGroupbyId(subgroup_id);
        res.status(200).json({ message: "Group deleted successfully" });

    } catch (err) {
        console.error("Error in deletesubGroupbyId:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};
