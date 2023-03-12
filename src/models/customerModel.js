const mongoose = require("mongoose");


const customerSchema = new mongoose.Schema({
    firstName : {
        type: String ,
        require : true ,
        trim : true,
    },
    lastName : {
        type : String,
        require : true,
        trim : true,
    },
    mobileNumber : {
        type : String,
        require : true , 
        unique : true ,
        trim : true ,

    },
    DOB : Date,
    emailID : {
        type : String ,
        require : true ,
        unique : true ,
        trim : true ,
    },
    address : {
        type : String ,
        trim : true
    },
    customerID : {
        type :String,
        trim : true 
    },
    status : {
        type : String,
        default : "ACTIVE",
        trim : true 
    }
}, {timestamps:true});


module.exports = mongoose.model("Customer" , customerSchema)