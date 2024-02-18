const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const banSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  banUser:{
    type: ObjectId,
    required: true,
  },
  banUserName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ban", banSchema);