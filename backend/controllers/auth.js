import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// const bcrypt = require("bcryptjs");

export const register = async (req, res, next) => {
  try {
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(res.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      // password: hash,
      password: req.body.password,
      //dont write req.body directly cux in want to encode the password to [rovide more security]
    });
    await newUser.save();
    res.status(200).send("User has been created"); //or 201 = created sucessfuly
  } catch (err) {
    next(err);
  }
};
