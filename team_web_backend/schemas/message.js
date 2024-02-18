const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const messageSchema = new Schema({
  sender: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  senderName: {
    type: String,
    required: true,
  },
  receiver:{
    type: ObjectId,
    required: true,
    ref: "User",
  },
  content:{
    type : String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", messageSchema);