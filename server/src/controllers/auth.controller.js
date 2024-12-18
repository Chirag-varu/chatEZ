import { generateToken } from "../lib/utils.js";
import User from "../modules/user.module.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    const existingUserName = await User.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingUserName) {
      return res.status(400).json({ message: "User-name already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    } else {
      await newUser.save();
      generateToken(newUser._id, res);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (err) {
    console.error("Error in signup: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error("Error in login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
}; 

export const logout = (_req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in logout: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAcc = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOneAndDelete({ userId });

    if (!user) {      
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("token");
    res.status(200).json({ message: "Account deleted successfully" });

  } catch (err) {
    console.error("Error in delete account: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, profilePic } = req.body;
    const userId = req.user._id;

    if (!name || !profilePic) {
      return res.status(200).json({ message: "Nothing Changed" });
    }
    
    if (name) {
      var updatedUser = await User.findByIdAndUpdate(userId, { name });
    }

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
    }

    res.status(200).json(updatedUser);

  } catch (err) {
    console.log("Error in updateProfile: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in checkAuth: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
}
