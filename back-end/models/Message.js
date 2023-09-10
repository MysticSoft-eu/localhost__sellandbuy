const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    recipient: {type: Schema.Types.ObjectId, ref: 'User'},
    chatId: {type: Schema.Types.ObjectId, ref: 'Chat'},
    text: String,
}, {timestamps: true});

const MessageModel = mongoose.model('Message', MessageSchema);
module.exports = MessageModel;