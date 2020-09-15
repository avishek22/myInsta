const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

const PORT = 4000;
const { MONGOURI } = require("./keys");
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Database connected");
});
mongoose.set("useFindAndModify", false);
app.use(cors());
app.use(express.json());

app.use("/", require("./routers/auth"));
app.use("/", require("./routers/post"));
app.use("/", require("./routers/otheruser"));
app.use("/", require("./routers/followers"));

app.listen(PORT, (e) => {
  if (!e) {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.log(e);
  }
});
