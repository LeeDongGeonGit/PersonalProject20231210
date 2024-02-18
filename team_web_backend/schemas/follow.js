const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const followSchema = new Schema({
  sender: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  senderName:{
    type: String,
    required: true,
  },
  receiver: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  receiverName: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Follow", followSchema);
