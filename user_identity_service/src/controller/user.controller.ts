import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { registerUserDao } from "../service/user.service";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, email, password } = req.body;
    const result = await User.create({ userName, email, password });
    res.locals.data = result
    next()
} catch (error) {
    console.log(error);
    next(error)
    throw error;
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, email, password } = req.body;
    console.log("called")
    const result = await registerUserDao(req.body)
    res.locals.data = result
    next()


  } catch (error) {
    next(error)
  }
};
