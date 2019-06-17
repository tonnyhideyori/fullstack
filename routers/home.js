const express = require('express')
const app = express.Router()
module.exports = app =>{app.get("/", (req, res) => {
  res.send("hello this is home rooter");
});
}
