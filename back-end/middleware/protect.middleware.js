import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({
        error: "Unauthorized: no token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return req.status(404).json({
        error: "Unauthorized: In valid token",
      });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Some thing went wrong while protect middleware");
    return res.status(500).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
};
