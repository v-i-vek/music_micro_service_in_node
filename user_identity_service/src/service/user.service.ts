import { User } from "../models/user.model";
import { EHttpCode, HttpException } from "../utils/httpException";
import { ILoginUser, IUser } from "../utils/interface/user.interface";
import bcrypt from "bcrypt";
import { getMessage } from "../utils/message";
import { generateToken } from "../utils/util.service";

export const registerUserDao = async (user: IUser) => {
  try {
    const { email, password, userName } = user;
    const userExist = await User.findOne({ where: { email, userName } });
    if (!userExist) {
      return await User.create({ email, password, userName });
    }
     throw new HttpException(
        EHttpCode.BAD_REQUEST,
        getMessage("incorrectEmailPassword")
      );
  } catch (error) {
    throw error;
  }
};

export const loginUserDao = async (user: ILoginUser) => {
  try {
    const { userName, password } = user;
    const userExist = await User.findOne({ where: { userName } });

    if (!userExist) {
      throw new HttpException(
        EHttpCode.BAD_REQUEST,
        getMessage("userNotFound")
      );
    }
    const userPlain = userExist.get({ plain: true });
    const isValidPassword = await bcrypt.compare(password, userPlain.password);
    if (!isValidPassword) {
      throw new HttpException(
        EHttpCode.BAD_REQUEST,
        getMessage("incorrectEmailPassword")
      );
    }

    return await generateToken(userPlain);

  } catch (error) {
    console.error("Authentication error:", error);
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(
      EHttpCode.INTERNAL_SERVER_ERROR,
      "Authentication failed"
    );
  }
};
