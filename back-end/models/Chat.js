const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    recipient: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    itemId : {type:mongoose.Schema.Types.ObjectId, ref:'Item'},
    title : String,

});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;