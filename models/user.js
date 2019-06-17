const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const keys = require("../keys/key");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    password: { type: String, required: false },
    Facebook: { id: String, token: String, email: String, name: String },
    Google: { id: String, token: String, email: String, name: String }
  },
  { timestamps: true }
);

userSchema.methods.AuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id
    },
    keys.jwtPrivate
  );
  return token;
};
const User = mongoose.model("user", userSchema);
function validate(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validate;
