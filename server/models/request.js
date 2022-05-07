const mongoose = require("mongoose")
const geocoder = require('../utils/geocoder');


const RequestSchema = new mongoose.Schema({
    
    requestType: {
        type: String,
        required: [true, 'please select type of request']
    },
    contactInfo: {
        type: String,
        required: [true, 'PLease add contact info']
    },
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
    category: {
        type: String,
        requred: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    accepetedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

RequestSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
});

module.exports = mongoose.model("Request", RequestSchema)