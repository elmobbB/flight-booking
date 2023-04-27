import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connect to mongodb");
  } catch (error) {
    throw error; //no api request->throw error
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

//middlewares
app.use("/backend/auth", authRoute);
app.use("/backend/users", authRoute);
app.use("/backend/hotels", authRoute);
app.use("/backend/rooms", authRoute);

app.listen(8800, () => {
  connect();
  console.log("connected to backend.");
});
