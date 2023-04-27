import express from "express";
import Hotel from "../models/Hotel.js";
const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update
//delete
//get
//get all

router.get("/register", (req, res) => {
  res.send("registered");
});

export default router;
