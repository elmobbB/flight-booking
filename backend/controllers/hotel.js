import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    //update Hotel collection in database
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //set method
      },
      { new: true }
    );
    res.status(200).json(updatedHotel); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    //update Hotel collection in database
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel is deleted"); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    //update Hotel collection in database
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};
export const getAllHotel = async (req, res, next) => {
  // const failed = true; //if there is error, i dont want to try and catch
  // if (failed) return next(createError(401, "you are not authenticated"));
  try {
    //update Hotel collection in database
    const allHotels = await Hotel.find();

    res.status(200).json(allHotels); //if the request is sucessfull
  } catch (err) {
    next(err);
  }
};
