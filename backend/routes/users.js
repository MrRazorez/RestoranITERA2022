var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

router.post('/login', adminController.Login);
router.post('/token', adminController.Tokens);
router.post('/logout', adminController.Logout);

module.exports = router;
