const userController = require('../../controllers/userCtrl');
module.exports = function(router) {
router.get('/camp', userController.getAllUsers);
router.post('/camp', userController.addUser);
router.get('/users/:email', userController.getUserByEmail);
}
