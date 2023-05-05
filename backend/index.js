import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
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

//middlewares   impt:able to reach request, response
app.use(cookieParser());
app.use(express.json()); //can send json obb to express server

//all the routes for our server are located in the file routes/authjs.  or routes.hotel etc .
//  then tell our server to use these module for all the incoming requests to routes that start with /auth.js etc
app.use("/backend/auth", authRoute);
app.use("/backend/users", usersRoute);
app.use("/backend/hotels", hotelsRoute);
app.use("/backend/rooms", roomsRoute);

app.use((err, req, res, next) => {
  //if there is any problem in CRUD, do the error handling here
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(500).json({
    succes: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack, //give more details about the error in crud
  });
});

app.listen(8800, () => {
  connect();
  console.log("connected to backend.");
});
