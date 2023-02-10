const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.post('/createCard', cardController.createCard);
router.get('/getCardList', cardController.getAllCards);

module.exports =router;