const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");

connect();

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hamletshu",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/member", require("./routes/memberRouter"));
app.use("/board", require("./routes/boardRouter"));
app.use("/comment", require("./routes/commentRouter"));
app.use("/follow", require("./routes/followRouter"));
app.use("/ban", require("./routes/banRouter"));
app.use("/message", require("./routes/messageRouter"));

app.listen(4000, () => {
  console.log("listen umm..umm..um...");
});
