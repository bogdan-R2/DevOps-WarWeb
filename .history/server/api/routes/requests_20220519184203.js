const requests = require('../../controllers/requestCtrl');

module.exports = function(router) {

router
  .route('/request')
  .get(requests.getRequests)
  .post(requests.addRequest);

router.get('/requests/offers', requests.getOffers);

}
