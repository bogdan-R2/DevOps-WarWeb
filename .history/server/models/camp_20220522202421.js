const mongoose = require("mongoose")
const geocoder = require('../utils/geocoder');


const CampSchema = new mongoose.Schema({
    
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    requestType: {
        type: String,
        enum: ['Offer', 'Request'],
        required: [true, 'please select type of request']
    },
    city: {
        type: String,
        required: [true, 'PLease insert city']
    },
    country: {
        type: String, 
        required: [true, 'Please insert country']
    },
    category: {
        type: String,
        enum: ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'],
        requred: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAccepted: {
        type: Boolean,
        default: false
    }

})
module.exports = mongoose.model("Camp", RequestSchema)