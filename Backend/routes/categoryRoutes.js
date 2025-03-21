 
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategory);
router.get('/name', categoryController.getCategoryByName);
router.delete('/delete', categoryController.deleteCategoryByName);

module.exports = router;
