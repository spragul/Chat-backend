const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    chatNumber: [
        { name:{type:String,required:true},
          mobile:{type:Number,required:true},
          roomid:{type:String,required:true}
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
let UserModel = mongoose.model('users', userSchema);
module.exports = { UserModel };