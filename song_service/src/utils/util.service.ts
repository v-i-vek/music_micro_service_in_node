import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  try {
    const accessToken = await jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return {accessToken};
  } catch (error) {
    console.error("error while executing generateToken() \n");
    throw error;
  }
};
