const mongoose = require('mongoose');


const chatschemas = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    chat:[
        { author:{type:String,required:true},
        message:{type:String,required:true},
        time:{type:String,required:true}
      }  
    ],
    userId:{
        type:String,
        required:true
    },
    roomid:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
let ChatModel = mongoose.model('chatdata', chatschemas);
module.exports = { ChatModel };