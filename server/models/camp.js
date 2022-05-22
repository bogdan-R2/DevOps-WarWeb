const mongoose = require("mongoose")
const geocoder = require('../utils/geocoder');


const CampSchema = new mongoose.Schema({
    
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    city: {
        type: String,
        required: [true, 'PLease insert city']
    },
    country: {
        type: String, 
        required: [true, 'Please insert country']
    },
    phoneNumber: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    currentCapacity: {
        type: Number,
        required: true
    }

})
module.exports = mongoose.model("Camp", CampSchema)