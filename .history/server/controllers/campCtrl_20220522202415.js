const User = require("../models/user");



exports.getUserByEmail = async (req, res, next) => {
  try {
    const qry = {
      email: req.params.email
    }
    console.log(qry);
    foundUser = User.findOne(qry)
        .sort({'createdOn': -1})
        .exec()
        .then(docs => res.status(200)
          .json({data:docs}))
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
      const allUsers = await User.find();
  
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
  
  exports.addCamp = async (req, res) => {
    try {
        await request.create(req.body)
        .then(() => {
            res.status(201).send({
            status: true,
            message: "camp added succesfully"
          });
        })
        .catch((error) => {
            res.status(400).send({
                status: false,
                message:error.message,
            });
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
     
};
