const request = require('../models/Request');


exports.getRequests = async (req, res, next) => {
  try {
    const requests = await request.find();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getOffers = async (req, res, next) => {
  try {
    const qry = {
      requestType: "Offer",
    }
    const requests = await request.find();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.addRequest = async (req, res, next) => {
  try {
    await request.create(req.body)
    .then(() => {
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
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};