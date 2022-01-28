//SELECT *
const getAllUsersLogin = 'SELECT * FROM login_table;';
const getAllUsers = 'SELECT * FROM users;';
const getAllRequests = 'SELECT * FROM requests;';

const getAllNGOsLogin = 'SELECT * FROM ngo_login_table;';
const getAllNGOs = 'SELECT * FROM ngo;';
const getAllNGOsUserMappings = 'SELECT * FROM ngo_users_map;';

//CHECKS
const checkUsernameEmailAvailable = 'SELECT EXISTS(SELECT 1 FROM login_table WHERE email = $1 OR username = $2);';
const checkValidId = 'SELECT EXISTS(SELECT 1 FROM login_table WHERE id=$1);';
const checkValidRequestIds = 'SELECT * FROM users WHERE id IN ($1, $2);';
const checkNGOEmailAvailable = 'SELECT EXISTS(SELECT 1 FROM ngo_login_table WHERE email = $1);';
const checkValidNGOId = 'SELECT EXISTS(SELECT 1 FROM ngo_login_table WHERE id = $1);';

//INSERTIONS 
const addUserLogin = 'INSERT INTO login_table(username, email, password) VALUES ($1, $2, $3);';
const addUser = 'INSERT INTO users (id, full_name, phone_number, blood_type, address) VALUES ($1, $2, $3, $4, $5);';
const addRequest = 'INSERT INTO requests (receiver_id, donor_id, description, donation_location, blood_type, blood_amount_needed, blood_amount_received) VALUES ($1, $2, $3, $4, $5, $6, $7);';

const addNGOLogin = 'INSERT INTO ngo_login_table (email, password) VALUES ($1, $2);';
const addNGO = 'INSERT INTO ngo (id, name, contact_number, description, head_name) VALUES ($1, $2, $3, $4, $5);';

module.exports = {
    //GET ALL
    getAllUsersLogin,
    getAllUsers,
    getAllRequests,

    getAllNGOsLogin,
    getAllNGOs,
    getAllNGOsUserMappings,

    //CHECKS
    checkUsernameEmailAvailable,
    checkValidId,
    checkValidRequestIds,
    checkNGOEmailAvailable,
    checkValidNGOId,

    //INSERTIONS
    addUserLogin,
    addUser,
    addRequest,

    addNGOLogin,
    addNGO,
}