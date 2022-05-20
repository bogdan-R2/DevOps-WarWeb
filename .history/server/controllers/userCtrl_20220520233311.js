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
  
  exports.addUser = async (req, res) => {
    try {
    let query = req.body.email; //Extract title from input form
    User.findOne({email:query}, function(err, foundUser){
        if(err) console.log(err);
        if ( foundUser){
            console.log("This email is already registered");
        } else {
 
            let newUser = new User(req.body);
            newUser.save(function(err, example) {
                if(err) console.log(err);
                console.log("New example created");
                
            });

            return res.status(200).json({
              success: true,
              data: newUser
            });
        }
    });}
    catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};
