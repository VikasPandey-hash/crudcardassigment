const cardModel = require('../models/cardModel');
const mongoose = require('mongoose');

//===============================Create New Card==============================================

const createCard = async function(req,res){
    try{
        let {cardType,customerName, customerID, cardNumber} = req.body;
        
        if(!(cardType=="REGULAR"|| cardType=="SPECIAL")){
            return res.status(400).send({status:false, message: "Please Select one one of the card type diamond, silver, Gold"})
        }
        if (!customerName) {
            return res.status(400).send({ status: false, message: "Please Enter Customer Name" })
        }
        if (!/^[a-z ,.'-]+$/i.test(customerName)) {
            return res.status(400).send({ status: false, message: "Please Enter Customer Name in right format" })
        }
        if (!cardNumber) {
            return res.status(400).send({ status: false, message: "Please Enter customerID" })
        }
        if (!mongoose.Types.ObjectId.isValid(cardNumber)) {
            return res.status(400).send({ status: false, message: "Please Enter valid Id" })
        }

        let card = await cardModel.create(req.body);
        return res.status(201).send({status: true, message: "Card created successfully", cardDetail:card});
    }
    catch(error){
        return res.status(500).send({status: false, message:error.message});
    }
}

//=======================================Get All Card======================================

const getAllCards = async function(req, res){
    try{
        let cardList = await cardModel.find();
        if(!cardList.length){
            return res.status(404).send({status: false, message:"No card found"})
        }
        return res.status(200).send({status: true, message:`${cardList.length} cards found`, cardList:cardList});

    }
    catch(error){
        return res.status(500).send({status:false, message: error.message})
    }
}

module.exports = {
    createCard,
    getAllCards
}