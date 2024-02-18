const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");

router.post("/update", async (req, res) => {
    try {
      await Comment.update(
        { _id: req.body._id },
        {
          $set: {
            content: req.body.content
          }
        }
      );
      res.json({ message: "댓글이 수정 되었습니다." });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });
  router.post("/getComment", async (req, res) => {
    try {
      const board = req.body.board;
      const comment= await Comment.find({ board: board }, null, {
        sort: { createdAt: -1 }
      });
      res.json({ list: comment });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });
  
router.post("/write", async (req, res) => {
    try {
      let obj;
  
      obj = {
        writer: req.body.writer,
        board: req.body.board,
        content: req.body.content
      };
  
      const comment = new Comment(obj);
      await comment.save();
      res.json({ message: "댓글이 업로드 되었습니다." });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });
  router.post("/delete", async (req, res) => {
    try {
      await Comment.remove({
        _id: req.body._id
      });
      res.json({ message: true });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });
  module.exports = router;