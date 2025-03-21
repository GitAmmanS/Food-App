const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController')

router.post('/users', userController.createUser);
router.post("/login", userController.loginUser);
router.get('/users',userController.getUser);


module.exports = router;
