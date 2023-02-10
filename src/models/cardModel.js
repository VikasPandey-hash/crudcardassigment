const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema({
    cardType:{
        type: String,
        enum: ["REGULAR","SPECIAL"],
        require: true,
        trim: true
    },
    customerName: {
        type: String,
        require: true,
        trim: true
    },
    customerID: {
        type: ObjectId,
        ref: "Customer",
    },
    cardNumber:{
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    status: {
        type: String,
        default: "ACTIVE",
        trim: true
    }
},{timestamps: true});

module.exports = mongoose.model('Card', cardSchema)