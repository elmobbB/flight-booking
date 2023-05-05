import { createError } from "../utils/error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  //use async cuz i want multiple user to be able to login at the same time
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      // password: req.body.password,
      //dont write req.body directly cux in want to encode the password to [rovide more security]
    });
    await newUser.save();
    res.status(200).send("User has been registered"); //or 201 = created sucessfuly
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //find objects where the username exists
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password, //user input
      user.password //in db
    );
    if (!isPasswordCorrect)
      return next(createError(404, "Wrong password or username!"));
    //send jwt
    //hide user info in jsonwentoken and send it as a cookie
    //hash these info, with each request, we send jwt to verify our identify
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, //in each request, we send this jwt to verify our identify
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true, //doesnt allow client info to reach cookie, more secure
      })
      .status(200)
      .json({ ...otherDetails }); //(instead of putting user directly, dont want to send the password, isAdmin request)if password and username is ok, send the user
  } catch (err) {
    next(err);
  }
};
