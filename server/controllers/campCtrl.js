const Camp = require("../models/camp");


exports.getAllCamps = async (req, res, next) => {
    try {
      const allCamps = await Camp.find();
  
      return res.status(200).json({
        success: true,
        count: allCamps.length,
        data: allCamps
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.addCamp = async (req, res) => {
    try {
        await Camp.create(req.body)
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
