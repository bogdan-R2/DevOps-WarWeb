const userController = require('../../controllers/campCtrl');
module.exports = function(router) {
router.get('/camp', userController.getAllUsers);
router.post('/camp', userController.addUser);
}
