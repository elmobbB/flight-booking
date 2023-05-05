import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    //update User collection in database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //set method
      },
      { new: true }
    );
    res.status(200).json(updatedUser); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    //update User collection in database
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user is deleted"); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    //update User collection in database
    const user = await User.findById(req.params.id);
    res.status(200).json(user); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};
export const getAllUser = async (req, res, next) => {
  // const failed = true; //if there is error, i dont want to try and catch
  // if (failed) return next(createError(401, "you are not authenticated"));
  try {
    //update User collection in database
    const allUsers = await User.find();

    res.status(200).json(allUsers); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};
