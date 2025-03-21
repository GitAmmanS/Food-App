const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/order', orderController.getOrder);
router.get('/order/search', orderController.getOrderById);

module.exports = router;
