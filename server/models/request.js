const mongoose = require("mongoose")
const geocoder = require('../utils/geocoder');


const RequestSchema = new mongoose.Schema({
    
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
    /*
    location: {
        locType: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: {
            type: String
        }
    },*/

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
    accepetedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default: undefined
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
//TODO solve geocoder
/*
RequestSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
});
*/
module.exports = mongoose.model("Request", RequestSchema)