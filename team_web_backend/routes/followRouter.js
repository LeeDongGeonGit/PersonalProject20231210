const express = require("express");
const router = express.Router();
const Follow = require("../schemas/follow");

router.post("/delete", async (req, res) => {
  try {
    await Follow.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/accept", async (req, res) => {
  try {
    await Follow.updateOne(
      { _id: req.body._id },
      {
        $set: {
          state: "완료",
        }
      }
    );
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post("/ban", async (req, res) => {
    try {
      await Follow.updateOne(
        { _id: req.body._id },
        {
          $set: {
            state: "차단",
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

router.post("/request", async (req, res) => {
  try {
    let obj;

    obj = {
      sender: req.body.sender,
      senderName: req.body.senderName,
      receiver: req.body.receiver,
      receiverName: req.body.receiverName,
      state: "대기"
    };

    const follow = new Follow(obj);
    await follow.save();
    res.json({ message: "친구신청이 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getRequest", async (req, res) => {
  try {
    const receiver = req.body.receiver;
    const follow = await Follow.find({ receiver: receiver, state: "대기" }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: follow });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post("/getFollow", async (req, res) => {
    try {
      const receiver = req.body.receiver;
      const follow = await Follow.find({ receiver: receiver, state: "완료" }, null, {
        sort: { createdAt: -1 }
      });
      const follower = await Follow.find({ sender: receiver, state: "완료" }, null, {
        sort: { createdAt: -1 }
      });
      
      const combinedFollow = follow.concat(follower);

      // createdAt을 기준으로 정렬 (예시: 내림차순)
      combinedFollow.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
      res.json({ list: combinedFollow });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

  router.post("/isFollow", async (req, res) => {
    try {
      const user = req.body.user;
      const requestfollow = await Follow.find({ receiver: user, state: "대기" }, null, {
        sort: { createdAt: -1 }
      });
      const requestfollower = await Follow.find({ sender: user, state: "대기" }, null, {
        sort: { createdAt: -1 }
      });
      const follow = await Follow.find({ receiver: user, state: "완료" }, null, {
        sort: { createdAt: -1 }
      });
      const follower = await Follow.find({ sender: user, state: "완료" }, null, {
        sort: { createdAt: -1 }
      });
      if(requestfollow.length>0){
        res.json({ message: "친구요청을 받은 유저입니다." });
      }
      else if(requestfollower.length>0){
        res.json({ message: "이미 친구요청을 한 유저입니다." });
      }
      else if(follow.length>0 || follower>0){
        res.json({ message: "이미 친구 입니다." });
      }
      else{
        res.json({ re: true });
      }
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });


module.exports = router;