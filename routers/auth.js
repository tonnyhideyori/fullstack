const queryString= require('querystring')
const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const passport = require("passport");
const app = express.Router();
module.exports = app => {
  app.post("/app/signup", async (req, res) => {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    let user = await User.findOne({ name: req.body.name });
    if (user) {
      res.status(404).send("user already exists");
      return;
    }
    user = new User({
      name: req.body.name,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.AuthToken();
    await user.save();
    res.header("token", token).send({ name: user.name, id: user._id });
  });
  app.post("/app/signin", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    let user = await User.findOne({ name: req.body.name });
    if (!user) {
      res.status(404).send("username or password is wrong");
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).send("password or username is wrong");
      return;
    }
    const token = user.AuthToken();
    res.header("token", token).send({ name: user.name, id: user._id });
  });
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
      //console.log(req.user.token);
      const validUser = {
        id: req.user.user.id,
        name: req.user.user.name,
       token:req.user.token
      }
      const query = queryString.stringify(validUser)
      console.log(query)
      res.redirect("/?" + query);
    }
  ); //
};
