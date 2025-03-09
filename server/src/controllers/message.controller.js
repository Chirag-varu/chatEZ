import User from "../modules/user.module.js";
import Message from "../modules/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import CryptoJS from "crypto-js";
// import exp from "constants";

const SECRET_KEY = process.env.MESSAGE_SECRET_KEY;

const encryptMessage = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filter = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    res.status(200).json(filter);
  } catch (err) {
    console.log("Error In Get User: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const receiverId = req.params.id;
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUser, receiverId: receiverId },
        { senderId: receiverId, receiverId: loggedInUser },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error In Get Message: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const receiverId = req.params.id;
    const { content, image } = req.body;

    let imageLink;
    if (image) {
      const link = await cloudinary.uploader.upload(image);
      imageLink = link.secure_url;
    }

    const newMessage = new Message({
      senderId: loggedInUser,
      receiverId: receiverId,
      text: encryptMessage(content),
      image: imageLink,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error In Send Message: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    await Message.deleteOne({ _id: messageId });
    res.status(200).send();
  } catch (err) {
    console.log("Error In Delete Message: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAllMessages = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const receiverId = req.params.id;
    await Message.deleteMany({
      $or: [
        { senderId: loggedInUser, receiverId: receiverId },
        { senderId: receiverId, receiverId: loggedInUser },
      ],
    });
    res.status(200).json({ message: "All messages deleted" });
  } catch (err) {
    console.log("Error In Delete All Messages: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};
