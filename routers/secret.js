const express = require('express')
const auth=require('../middleware/authmiddle')
 
module.exports = app =>
  {app.get("/app/secret", auth, async (req, res) => {
    res.send("this is because you have login in and you have a token");
  });}
