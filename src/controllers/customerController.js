const customerModel = require("../models/customerModel")


const signUp = async function (req , res) {
    try {
        let {firstName , lastName , mobileNumber , DOB , emailID} = req.body;
        
        if(!firstName) {
            return res.status(400).send({status : false,message :"please enter the first name "})
        }
        if(!/^[a-z ,.'-]+$/i.test(firstName)) {
            return res.status(400).send({ status : false , message : "Please Enter the first name in right format"})
        }
        if(!lastName) {
            return res.status(400).send({status : false, message : "Please enter last name "})
        }
        if(!/^[a-z,.'-]+$/i.test(lastName)){
            return res.status(400).send({status : false , message : "Please enter the last name in right format "})
        }
        if(!mobileNumber) {
            return res.status(400).send({status : false , message : "Please enter the Mobile number "})
        }
        if(!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNumber)){
            return res.status(400).send({status : false , message : "please enter the mobile number in right format , number should be in 10 digits "})
        }
        if(!DOB) {
            return res.status(400).send({ status : false , message : "please enter the date of birth "})
        }
        if(!emailID){
            return res.status(400).send({status : false , message : " Please enter email ID"})
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID)){
            return res.status(400).send({status : false , message : "please enter the email in right format "})
        }
        let uniqueData = await customerModel.findOne({$or:[{mobileNumber:mobileNumber},{emailID : emailID}]});
        if(uniqueData){
            return res.status(400).send({status : false , message : "Mobile number or email id is already registered"});
        }
        let customerDetail = await customerModel.create(req.body);
        res.status(201).send({status: true , message : "you are register successfully",customerDetails : customerDetail})

} catch (error) {
        res.status(500).send({status : false , message : error.message})
    }
}


//^============ GET ALL CUSTOMER ============================

const getActiveUsers = async function (req,res){
    try {
      let isActive = req.query.status ;
      let allActiveUsers = await customerModel.find({status : isActive});
      if(!allActiveUsers.length){
        return res.status(404).send({status : false , message : "No Active Users Found "});
      }
      return res.status(200).send({status : true , message : `${allActiveUsers.length} user found `, allActiveUsers:allActiveUsers});
        



    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}


//^================DELETE USERS===========================


const deleteCustomer = async function (req , res) {
    try {
       let customerID = req.params.customerID
        let customerDeleted = await customerModel.findByIdAndUpdate(customerID,{$set:{status : "INACTIVE"}},{new: true });
        return res.status(200).send({status : false , message : `${customerDeleted.firstName+" "+customerDeleted.lastName} is deleted successfully`, customerDeleted})



    } catch (error) {
        return res.status(500).send({status : false , message : error.message});
    }
}
module.exports = { signUp , getActiveUsers , deleteCustomer}