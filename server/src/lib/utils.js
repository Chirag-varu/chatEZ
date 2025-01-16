import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.HTTPS,
  });

  return token;
};
