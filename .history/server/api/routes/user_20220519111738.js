const userController = require('../../controllers/userCtrl');
module.exports = function(router) {
router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.get('/users/:email', userController.getUserByEmail);
}
