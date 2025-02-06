import { generateToken } from "../lib/utils.js";
import Admin from "../modules/admin.module.js";
import User from "../modules/user.module.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import cloudinary from "../lib/cloudinary.js";

const otpStore = {};

export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { otp, expiresAt };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  const verificationMail = {
    from: "chatEZ Email Verification Bot",
    to: email,
    subject: "chatEZ - Email Verification (Valid for 5 minutes)",
    text: `The OTP for registration is ${otp}. 
    It is only valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(verificationMail);
  } catch (error) {
    console.log("Error sending email:", error.message);
    throw new Error("Failed to send OTP");
  }

  return otp;
};

export const sendOTP2 = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore[email] = { otp, expiresAt };

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const verificationMail = {
      from: "chatEZ Email Verification Bot",
      to: email,
      subject: "chatEZ - Email Verification (Valid for 5 minutes)",
      text: `The OTP for updating password is ${otp}. It is only valid for 5 minutes.`,
    };

    await transporter.sendMail(verificationMail);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

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

    const otp = await sendOTP(email);

    otpStore[email] = { otp, hashedPassword, name };

    res.status(201).json({
      message:
        "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (err) {
    console.error("Error in signup: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP has expired or is invalid" });
    }

    const { otp: storedOTP, expiresAt, hashedPassword, name } = otpStore[email];
    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (parseInt(otp) != storedOTP) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again!" });
    }

    const newUser = new User({
      name: otpStore[email].name,
      email,
      password: hashedPassword,
      profilePic:
        "https://imgs.search.brave.com/bitKFfksUGHS3vv5btnv4Dr3gcX0xh8rnof4HOIrIVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy52ZXJ5aWNvbi5j/b20vcG5nLzEyOC9z/eXN0ZW0vc3VwZXIt/c3lzdGVtLWljb24v/dXNlci0xMTcucG5n",
    });

    await newUser.save();

    delete otpStore[email];

    const token = generateToken(newUser, res);

    return res.status(200).json({
      message: "OTP verified successfully, registration complete",
      user: newUser,
      token,
    });
  } catch (error) {
    console.log("Error in verifyOTP: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP2 = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP has expired or is invalid" });
    }

    const { otp: storedOTP, expiresAt, hashedPassword, name } = otpStore[email];
    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (parseInt(otp) != storedOTP) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again!" });
    }
    delete otpStore[email];

    return res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.log("Error in verifyOTP2: ", error);
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

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (password !== admin.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateToken(admin._id, res);

    return res.status(200).json({
      _id: admin._id,
      email: admin.email,
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
};

export const updateProfile = async (req, res) => {
  try {
    const { name, profilePic } = req.body;

    const userId = req.user._id;

    if (!name && !profilePic) {
      return res.status(200).json({ message: "Nothing Changed" });
    }

    let updateData = {};

    if (name) {
      var updatedUser = await User.findByIdAndUpdate(userId, { name });
      updateData.name = name;
    }

    if (profilePic) {
      // Convert the blob URL to base64 before sending to Cloudinary
      const base64Image = profilePic.split(",")[1];

      const uploadResponse = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`
      );

      updateData.profilePic = uploadResponse.secure_url;

      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
    }
    // console.log("updated profile: ", updatedUser);

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error in updateProfile: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "No account associated with this email" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isValidPassword) {
      return res.status(400).json({
        message: "Choose a new password that is not the same as your old one.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    existingUser.password = await bcrypt.hash(password, salt);

    await existingUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in update password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in checkAuth: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};
