 const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);

router.get('/products/search1', productController.getProduct);
router.get('/products', productController.getProduct1);
router.get('/products/search', productController.searchProductByName);
router.delete('/delete', productController.deleteProductByName);

module.exports = router;
