import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        success: false,
      });
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.app.locals.conUser = user
    next()
  } catch (error) {
      return res.status(429).json({
      message: "Invalid token!",
      success: false,
    });
  }
};
