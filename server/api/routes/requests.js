const requests = require('../../controllers/requestCtrl');

module.exports = function(router) {

router
  .route('/requests')
  .get(requests.getRequests)
  .post(requests.addRequest);
}
