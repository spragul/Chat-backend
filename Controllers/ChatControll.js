const mongoose = require('mongoose');
const { ChatModel } = require('../Model/chatnumber');
const { UserModel } = require('../Model/User_Schemas');
const { URL } = require('../Dbconfig/Dbconfig');
let db = mongoose.connect(URL)
    .then(() => console.log('Connected!'));



exports.addchart = async (req, res) => {
    try {
        console.log(req.body)
        let user = await UserModel.findOne({ mobile: req.body.mobile })
        if (user) {
            let data = await ChatModel.create(req.body);
            res.status(200).send({
                chatrd: true,
                data: data,
                message: "Chat add Successfull!"
            })
         let a= await UserModel.findByIdAndUpdate({_id:data.userId},{$push:{chatNumber:{name:req.body.name,mobile:req.body.mobile,roomid:req.body.roomid}}});
         let chat1=await UserModel.findOne({_id:data.userId})
         let b=await UserModel.findOneAndUpdate({mobile:req.body.mobile},{$push:{chatNumber:{name:chat1.name,mobile:chat1.mobile,roomid:req.body.roomid}}})
           console.log(b)
        } else {
            res.status(400).json({  message: "Mobile number not Exists",userrd: false, });
        }

    } catch (error) {
        res.status(500).json({ message: `Internal server error.\n\n${error}`,userrd: false,  });
        console.log(error)

    }
}

exports.chat= async (req, res) => {
    try {
        let chatdata = await ChatModel.findOne({ roomid: req.params.roomid })
        if (chatdata) {
            res.status(200).send({
                chatrd: true,
                chatdata,
                message: "Chat geting Successfull!"
            })
        } else {
            res.status(400).send({ userrd: false, message: "Roomid  alreay Exists" });
        }

    } catch (error) {
        res.status(500).send({ userrd: false, message: `Internal server error.\n\n${error}` });
        console.log(error)

    }
}