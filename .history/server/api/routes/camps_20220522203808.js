const campController = require('../../controllers/campCtrl');
module.exports = function(router) {
router.get('/camp', campController.getAllCamps);
router.post('/camp', campController.addCamp);
}
