var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController')

// //@route   GET 
// //@desc    Get User 
// //@access  public (token not req) 
router.get('/', UserController.getUser);

// //@route   POST 
// //@desc    Register User  
// //@access  public 
router.post('/',UserController.validate('registerUser'), UserController.registerUser);


module.exports = router;