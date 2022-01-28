const { Router } = require('express');
const controller = require('./controller');
const router = Router();

//GET ALL
router.get('/users/', controller.getAllUsers);
router.get('/users/logins/', controller.getAllUsersLogin);
router.get('/users/requests/', controller.getAllRequests);

router.get('/ngos/', controller.getAllNGOs);
router.get('/ngos/logins/', controller.getAllNGOsLogin);
router.get('/ngos/ngo-user-map/', controller.getAllNGOsUserMappings);

//POST
router.post('/users/', controller.addUser); 
router.post('/users/logins/', controller.addUserLogin);
router.post('/users/requests/', controller.addRequest);

router.post('/ngos/logins/', controller.addNGOLogin);
router.post('/ngos/', controller.addNGO);

module.exports = router;