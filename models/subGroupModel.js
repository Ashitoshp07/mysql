const db = require('../config/db');
const { getsubGroupByGroup, getSubGroupMember } = require('../controllers/subGroupController');

const sub_Group = {
    createsubGroup: async (subgroup_name, subgroup_profile_url, group_name, group_id, user_name) => {
        const query = 'INSERT INTO `sub_group` (subgroup_name,subgroup_profile_url, group_name, group_id, user_name) VALUES (?, ?,?, ?, ?)';
        const [result] = await db.execute(query, [subgroup_name, subgroup_profile_url, group_name, group_id, user_name]);
        return result.insertId;
    },

    getsubGroupById: async (subgroup_id) => {
        const query = 'SELECT * FROM `sub_group` WHERE subgroup_id = ?';
        const [rows] = await db.execute(query, [subgroup_id]);
        return rows[0];
    },

    getSubGroupMember: async (group_name,subgroup_name) => {

        const query = `
        SELECT u.user_name, u.user_profile_url
        FROM sub_group_member sgm
        JOIN sub_group sg ON sgm.subgroup_id = sg.subgroup_id
        JOIN user u ON sgm.user_contact = u.user_contact
        WHERE sg.group_name = ? AND sg.subgroup_name = ?
    `;

        const [rows] = await db.execute(query, [group_name,subgroup_name]);
        return rows;
    },


    getsubGroupByGroup: async (group_name, user_name) => {
        const query = `
            SELECT sg.*
            FROM sub_group_member sgm
            JOIN sub_group sg ON sgm.subgroup_id = sg.subgroup_id
            WHERE sgm.user_name = ?
            AND sg.group_name = ?
        `;
    
        const [rows] = await db.execute(query, [user_name, group_name]);        
        return rows;
    },
    

    deletesubGroupbyId: async (subgroup_id) => {
        const query = 'DELETE FROM `sub_group` WHERE subgroup_id = ?';
        const [result] = await db.execute(query, [subgroup_id]);
        return result.affectedRows > 0;
    },

    updatesubGroup: async (subgroup_id, subgroup_name, subgroup_profile_url) => {
        const query = 'UPDATE `sub_group` SET subgroup_name = ?, subgroup_profile_url = ? WHERE subgroup_id = ?';
        const [result] = await db.execute(query, [subgroup_name, subgroup_profile_url, subgroup_id]);
        return result.affectedRows > 0;
    },


}



module.exports = sub_Group;