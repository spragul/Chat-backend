const express = require('express');
const router = express.Router();
const usercontroller = require('../Controllers/UserControll')

router.get('/',usercontroller.data)
router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.login);
router.get('/:id',usercontroller.finddata);
router.post('/forgotpassword',usercontroller.forgotpassword)
router.post("/resetpassword/:id/:token",usercontroller.resetpassword)
module.exports= router