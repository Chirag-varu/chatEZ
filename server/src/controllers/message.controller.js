import User from "../modules/user.module.js";
import Message from "../modules/message.module.js";

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
        const { text, image } = req.body;

        let imageLink;
        if (image) {
            const link = await cloudinary.uploader.upload(image);
            imageLink = link.secure_url;
        }

        const newMessage = new Message({
            senderId: loggedInUser,
            receiverId: receiverId,
            message: text,
            image: imageLink,
        });

        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (err) {
        console.log("Error In Send Message: " + err);
        res.status(500).json({ message: "Internal server error" });
    }
}
