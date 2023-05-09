import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
// import { createError } from "../utils/error";
const router = express.Router();

//alternatives
// router.post("/", async (req, res) => {
//   let collection = await db.collection("posts");
//   let newDocument = req.body;
//   newDocument.date = new Date();
//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

//create
router.post("/", verifyAdmin, createHotel);
// router.post("/", async (req, res, next) => {
//   const newHotel = new Hotel(req.body);
//   try {
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel); //if the request is sucessfull
//   } catch (err) {
//     next(err);
//   }
// });
//update
router.put("/:id", verifyAdmin, updateHotel);
// router.put("/:id", async (req, res) => {
//   try {
//     //update Hotel collection in database
//     const updatedHotel = await Hotel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body, //set method
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedHotel); //if the request is sucessfull
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//delete
router.delete("/:id", verifyAdmin, deleteHotel);
// router.delete("/:id", async (req, res) => {
//   try {
//     //update Hotel collection in database
//     await Hotel.findByIdAndDelete(req.params.id);
//     res.status(200).json("hotel is deleted"); //if the request is sucessfull
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//get
router.get("/:id", getHotel);
// router.get("/:id", async (req, res) => {
//   try {
//     //update Hotel collection in database
//     const hotel = await Hotel.findById(req.params.id);
//     res.status(200).json(hotel); //if the request is sucessfull
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get all
router.get("/", getAllHotel);
// router.get("/", async (req, res, next) => {
//   // const failed = true; //if there is error, i dont want to try and catch
//   // if (failed) return next(createError(401, "you are not authenticated"));
//   try {
//     //update Hotel collection in database
//     const allHotels = await Hotel.find();

//     res.status(200).json(allHotels); //if the request is sucessfull
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/register", (req, res) => {
  res.send("registered");
});

export default router;
