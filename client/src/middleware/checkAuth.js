const { firebase } = require("../firebase")
const checkAuth = async (req, res, next) => {
  const authToken = req.headers.authtoken;
  if (!authToken) {
    res.status(403).send('Unauthorized');
  }
  firebase.auth().verifyIdToken(authToken).then((user) => {
      req.user = user;
      next();
    }).catch(() => {
      res.status(403).send('Unauthorized');
    });
};
module.exports = { checkAuth };