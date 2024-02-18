const express = require("express");
const router = express.Router();
const Message = require("../schemas/message");

router.post("/delete", async (req, res) => {
  try {
    await Message.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


router.post("/send", async (req, res) => {
  try {
    let obj;

    obj = {
      sender: req.body.sender,
      senderName: req.body.senderName,
      receiver: req.body.receiver,
      content: req.body.content,
    };

    const message = new Message(obj);
    await message.save();
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getMessage", async (req, res) => {
  try {
    const receiver = req.body.receiver;
    const message = await Message.find({ receiver: receiver}, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: message });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


module.exports = router;