const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'PLease proviode your email'],
        unique: true
    },
    fullNname: {
        type: String
    },
    postedRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Requests"}],
    city: {
        type: String, 
        required: [true, "Please select city of the request"]
    },

    country: {
        type: String, 
        required: [true, 'Please insert a country']
    }
})

module.exports = mongoose.model("User", UserSchema)