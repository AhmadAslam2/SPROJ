const pool = require('../db');
const queries = require('./queries');

//GET ALL
const getAllUsers = (req, res) => {
    pool.query(queries.getAllUsers, (error, results) => {
        if (error) {
            throw error;
        };
        res.status(200).json(results.rows);
    });
};
const getAllUsersLogin = (req, res) => {
    pool.query(queries.getAllUsersLogin, (error, results) => {
        if (error) {
            throw error;
        };
        res.status(200).json(results.rows);
    })
}
const getAllRequests = (req, res) => {
    pool.query(queries.getAllRequests, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const getAllNGOs = (req, res) => {
    pool.query(queries.getAllNGOs, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}
const getAllNGOsLogin = (req, res) => {
    pool.query(queries.getAllNGOsLogin, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}
const getAllNGOsUserMappings = (req, res) => {
    pool.query(queries.getAllNGOsUserMappings, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

//ADD
const addUserLogin = (req, res) => {
    const {username, email, password} = req.body; 
    pool.query(queries.checkUsernameEmailAvailable, [email, username], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows[0].exists){
            res.send("Username or Email already taken");
        }
        else {
            pool.query(queries.addUserLogin, [username, email, password], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).send("User has been signed up!");
            })
        }
    
    })
}
const addUser = (req, res) => {
    const {id, full_name, phone_number, blood_type, address} = req.body; 
    pool.query(queries.checkValidId, [id], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows[0].exists == false){
            res.send("Invalid Id");
        }
        else {
            pool.query(queries.addUser, [id, full_name, phone_number, blood_type, address], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).send("User's details have been entered in the database!");
            })
        }
    
    })
}
const addRequest = (req, res) => {
    const {receiver_id, donor_id, description, donation_location, blood_type, blood_amount_needed, blood_amount_received}  = req.body; 
    pool.query(queries.checkValidRequestIds, [receiver_id, donor_id], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows.length < 2){
            res.send("Receiver or Donor Id is invalid");
        }
        else {
            pool.query(queries.addRequest, [receiver_id, donor_id, description, donation_location, blood_type, blood_amount_needed, blood_amount_received], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).send("The request has been added to the database");
            })
        }
    
    })
}

const addNGOLogin = (req, res) => {
    const {email, password} = req.body; 
    pool.query(queries.checkNGOEmailAvailable, [email], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows[0].exists){
            res.send("Email already taken");
        }
        else {
            pool.query(queries.addNGOLogin, [email, password], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).send("The NGO has been signed up!");
            })
        }
    
    })
}
const addNGO = (req, res) => {
    const {id, name, contact_number, description, head_name} = req.body; 
    pool.query(queries.checkValidNGOId, [id], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows[0].exists == false){
            res.send("Invalid Id");
        }
        else {
            pool.query(queries.addNGO, [id, name, contact_number, description, head_name], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).send("The NGO details have been added in the database!");
            })
        }
    
    })
}

module.exports = {
    //GET ALL
    getAllUsers,
    getAllUsersLogin,
    getAllRequests,
    getAllNGOs,
    getAllNGOsLogin,
    getAllNGOsUserMappings,

    //ADD
    addUserLogin,
    addUser,
    addRequest,

    addNGOLogin,
    addNGO,
}