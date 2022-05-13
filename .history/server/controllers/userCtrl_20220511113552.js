const user = require("../models/user");



exports.getUserByEmail = async (req, res, next) => {
  try {
    const qry = {
      email: req.params.email
    }
    console.log(qry);
    foundUser = user.findOne(qry)
        .sort({'createdOn': -1})
        .exec()
        .then(docs => res.status(200)
          .json(docs))
          .catch(err => res.status(500)
          .json({
              message: "error finding user by email",
              error: err
        }))
        /*
    return res.status(200).json({
      success: true,
      data: foundUser
    });*/
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getAllUsers = async (req, res, next) => {
    try {
      const allUsers = await user.find();
  
      return res.status(200).json({
        success: true,
        count: allUsers.length,
        data: allUsers
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.addUser = async (req, res) => {
      try {
      await user.create(req.body)
      .then(() => {
        console.log(req.body)
          res.status(201).send({
          status: true,
          message: "request added succesfully"
        });
      })
      .catch(() => {
          res.status(400).send({
              status: false,
              message:"Error adding request",
          });
      })
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
  };