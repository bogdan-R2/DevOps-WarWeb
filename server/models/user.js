const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        firstName: String,
        lastName: String
    },

    roles: {
        type: String
    },
    contactInfo: {
        type: String
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
    posteRequests: []
})

UserSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  });
  

module.exports = mongoose.model("User", UserSchema)