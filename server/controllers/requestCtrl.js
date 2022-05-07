const request = require('../models/Request');


exports.getRequests = async (req, res, next) => {
  try {
    const requests = await request.find();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: stores
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addRequest = async (req, res, next) => {
  try {
    const request = await request.create(req.body)
    .then((request) => {
        res.status(201).send({
        status: true,
        message: "request added succesfully"
      })
      .json(request);
    })
    .catch((err) => {
        res.status(400).send({
            status: false,
            message:"Error adding request",
        }).json(err);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};