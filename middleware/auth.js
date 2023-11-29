import jwt from "jsonwebtoken";
import User from "./../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

import dotenv from "dotenv";
dotenv.config({ path: "./../config.env" });

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("bearer")) {
    //Bearer iuh2oe2e2
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route"));
  }
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("No user found"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Not authorized to access this route"));
  }
};
