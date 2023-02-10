const express =require('express');
const customerController = require('../controllers/customerController')

const router = express.Router();

router.post('/signUp', customerController.signUp);
router.get('/getActiveUsers', customerController.getActiveUsers);
router.delete('/deleteCustomer/:customerID', customerController.deleteCustomer);

module.exports = router;