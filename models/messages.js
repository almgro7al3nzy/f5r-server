const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: new Date()
    }
})

const Msg = mongoose.model("Chats", msgSchema);
module.exports = Msg;