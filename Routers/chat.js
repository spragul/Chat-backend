const express = require('express');
const router = express.Router();

const chatcontroll =require('../Controllers/ChatControll')
router.get('/:roomid',chatcontroll.chat);
router.post('/add', chatcontroll.addchart);

module.exports= router