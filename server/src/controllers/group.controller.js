import Group from "../modules/group.module.js";
import groupMessage from "../modules/groupMessage.module.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import CryptoJS from "crypto-js";
import { group } from "console";

const SECRET_KEY = process.env.MESSAGE_SECRET_KEY;

const encryptMessage = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const createGroup = async (req, res) => {
  try {
    const allmember = [...req.body.members, req.body.Admin];
    const group = new Group({
      groupName: req.body.groupName,
      admin: req.body.Admin,
      members: allmember,
    });

    await group.save();

    res.status(201).json({ group });
  } catch (error) {
    console.log("Error In Create Group: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGroup = async (req, res) => {
  try {
    const group = await Group.find({ members: req.params.id }).populate(
      "members"
    );

    const formattedGroups = group.map((group) => ({
      ...group.toObject(),
      _id: group._id.toString(),
      admin: group.admin.toString(),
      members: group.members.map((member) => ({
        _id: member.toString(),
        name: member.name,
      })),
    }));

    res.status(200).json({ formattedGroups });
  } catch (error) {
    console.log("Error In Get Group: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const groupId = req.params.id;
    const { content, image } = req.body;

    let imageLink;
    if (image) {
      const link = await cloudinary.uploader.upload(image);
      imageLink = link.secure_url;
    }

    const newMessage = new groupMessage({
      groupId: groupId,
      senderId: loggedInUser,
      message: encryptMessage(content),
      image: imageLink,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(groupId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error In Group of Send Message: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGroupMessage = async (req, res) => {
  try {
    // const loggedInUser = req.user._id;
    const groupId = req.params.id;
    const messages = await groupMessage
      .find({ groupId: groupId })
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error In Get Message: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGroupMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    await groupMessage.deleteOne({ _id: messageId });
    res.status(200).send();
  } catch (err) {
    console.log("Error in Delete Group Message" + err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteAllGroupMessages = async (req, res) => {
  try {
    const groupId = req.params.id;
    await groupMessage.deleteMany({ groupId: groupId });
    res.status(200).json({ message: "All messages deleted" });
  } catch (err) {
    console.log("Error In Delete All Group Messages: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    await groupMessage.deleteMany({ groupId: groupId });
    await Group.deleteOne({ _id: groupId });
    res.status(200).json({ message: "Group has been deleted"});
  } catch (err) {
    console.log("Error In Delete Group : " + err);
    res.status(500).json({ message: "Internal server error" });
  }
}
