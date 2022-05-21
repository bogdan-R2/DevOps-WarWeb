const requests = require('../../controllers/requestCtrl');

module.exports = function(router) {

router
  .route('/request')
  .get(requests.getRequests)
  .post(requests.addRequest);

router.get('/request/offers', requests.getOffers);
router.get('/request/:_id', requests.getRequestsById);
router.get('/request/by-category/:category', requests.getRequestsByCategory);
router.get('/request/offers/by-category/:category', requests.getOffersByCategory);
router.put('/request/update', requests.editRequest);

}
