import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//use verifyToken middleware
// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//   res.send("hello authenticated");
// });
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});

//update
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);

//get
router.get("/:id", getUser);

//get all
router.get("/", getAllUser);

export default router;
