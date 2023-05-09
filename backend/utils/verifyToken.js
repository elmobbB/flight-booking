import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //access token from cookie

  if (!token) return next(createError(401, "You are not authenticated"));

  //verify token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(401, "Token is not valid"));
    req.user = user; // if request is successful
    next(); //this middleware will run if no err
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, req, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) return next(403, "you are not authenticated");
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, req, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) return next(403, "you are not authenticated");
    }
  });
};
