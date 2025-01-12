import User from "../modules/user.module.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.error("Error in fetchong users: ", error);
        res.status(500).json({ message: "Internal Server Error"})
    }
};
