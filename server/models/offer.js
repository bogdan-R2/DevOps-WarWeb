const mongoose = require("mongoose")

const OfferSchema = new mongoose.Schema({
    
    requestType: {
        type: String
    },
    category: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})

module.exports = mongoose.model("Offer", OfferSchema)