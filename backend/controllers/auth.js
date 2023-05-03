import { createError } from "../utils/error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password, //user input
      user.password //in db
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
    res.status(200).json(user); //if password and username is ok, send the user
  } catch (err) {
    next(err);
  }
};
