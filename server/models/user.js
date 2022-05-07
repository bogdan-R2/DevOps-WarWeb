const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'PLease proviode your email']
    },
    fullNname: {
        type: String
    },
    /*
    role: {
        type: String,
        enum: ['Volunteer', 'Refugee'],
        default: undefined,
        required: [true, 'Please enter role '
        //type: String

    },
    */
    // aka phone number 
    postedRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Requests"}],
        /**
         * sau 
         *   postedRequests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Requests"},
         *  */ 
    city: {
        type: String, 
        required: [true, "Please select city of the request"]
    }
})

module.exports = mongoose.model("User", UserSchema)