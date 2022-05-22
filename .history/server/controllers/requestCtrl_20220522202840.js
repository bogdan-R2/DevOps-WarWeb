const Request = require('../models/request');


exports.getRequests = async (req, res, next) => {
  try {

    const qry = {
      requestType: "Request",
    }
    const requests = await Request.find(qry);

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
    const requests = await Request.find(qry);

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


exports.getRequestsById = async (req, res, next) => {
  try {
    const qry = {
      postedBy: req.params._id,
    }
    const requests = await Request.find(qry);

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


exports.getRequestsByCategory = async (req, res, next) => {
  try {
    const qry = {
      category: req.params.category,
      requestType: "Request"
    }
    const requests = await Request.find(qry);

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.getOffersByCategory = async (req, res, next) => {
  try {
    const qry = {
      category: req.params.category,
      requestType: "Offer"
    }
    const requests = await Request.find(qry);

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



exports.addRequest = async (req, res, next) => {
  try {
    await Request.create(req.body)
    .then(() => {
        res.status(201).send({
        status: true,
        message: "request added succesfully"
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


exports.editRequest = async (req, res, next) => {
  try {
    await Request.findOneAndUpdate({_id : req.body._id},
      {
        $set: {
          "description": req.body.description,
          "requestType": req.body.requestType,
          "city": req.body.city,
          "country": req.body.country,
          "category": req.body.category,
          "phoneNumber": req.body.phoneNumber
        },
      },
        { new: true, multi: false, runValidators: true, omitUndefined: true }

      )
    .then((result) => {
        if(!result) {
          return res.status(400).send("No request was  found!");
        }
        res.status(200).send({
        status: true,
        message: "Request updatetd succesfully!"
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


exports.deleteRequest = async (req, res, next) => {
  request.findByIdAndDelete(req.params._id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else {
        console.log("Deleted : ", docs);
        res.status(200).send({
          status: true,
          message: "Request deleted succesfully!",
          data: docs
        });
    }});
};