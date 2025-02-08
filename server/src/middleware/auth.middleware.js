import jwt from "jsonwebtoken";
import User from "../modules/user.module.js";
import Admin from "../modules/admin.module.js";

export const authenticate = async (req, res, next) => {
  try {
    const jwt_token = req.cookies.token;

    if (!jwt_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded_token = jwt.verify(jwt_token, process.env.SECRET_KEY);

    const user = await User.findById(decoded_token.id);
    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401).json({ message: "Unauthorized - User Not Found" });
  } catch (err) {
    console.error("Error on authentication:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const jwt_token = req.cookies.token;

    if (!jwt_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded_token = jwt.verify(jwt_token, process.env.SECRET_KEY);

    const admin = await Admin.findById(decoded_token.id);
    console.log("====================================");
    console.log(admin);
    console.log("====================================");
    if (admin) {
      req.admin = admin;
      return next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized - Admin Not Found" });
    }
  } catch (err) {
    console.error("Error on Admin authentication:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
