const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const keys = require("./keys/key.js");
const app = express();
app.use(cors());
if (process.env.NODE_ENV === "production") {
  mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
    .then(console.log("connected to mongodb.."))
    .catch(err => console.log(`error connecting to mongo db ${err}`));
} else {
  mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
    .then(console.log("connected to mongodb.."))
    .catch(err => console.log(`error connecting to mongo db ${err}`));
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

require("./service/passport");
//require("./routers/home")(app);
require("./routers/auth")(app);
require("./routers/secret")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"