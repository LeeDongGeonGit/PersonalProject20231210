const express = require("express");
const router = express.Router();
const Ban = require("../schemas/ban");

router.post("/delete", async (req, res) => {
  try {
    await Ban.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


router.post("/create", async (req, res) => {
  try {
    let obj;

    obj = {
      user: req.body.user,
      banUser: req.body.banUser,
      banUserName: req.body.banUserName,
    };

    const ban = new Ban(obj);
    await ban.save();
    res.json({ message: "차단 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getBanList", async (req, res) => {
  try {
    const user = req.body.user;
    const ban = await Ban.find({ user: user }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: ban });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post("/isBan", async (req, res) => {
    try {
      const user = req.body.user;
      const ban = await Ban.find({ user: user }, null, {
        sort: { createdAt: -1 }
      });
      const blocked = await Ban.find({ banUser: user }, null, {
        sort: { createdAt: -1 }
      });
      if(ban.length>0){
        res.json({ message: "차단한 유저입니다." });
      }
      else if(blocked.length>0){
        res.json({ message: "차단 당한 유저입니다." });
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