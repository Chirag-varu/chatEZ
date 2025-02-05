import User from "../modules/user.module.js";
import Message from "../modules/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.MESSAGE_SECRET_KEY;

const encryptMessage = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filter = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json(filter);
    } catch (err) {
        console.log("Error In Get User: " + err);
        res.status(500).json({ message: "Internal server error" });
    }
}

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
        console.log('====================================');
        console.log(messages);
        console.log('====================================');

        res.status(200).json(messages);
    } catch (err) {
        console.log("Error In Get Message: " + err);
        res.status(500).json({ message: "Internal server error" });
    }
}

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
}
