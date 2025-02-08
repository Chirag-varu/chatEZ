import User from "../modules/user.module.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in fetchong users: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
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

export const checkAdmin = async (req, res) => {
  try {
    console.log('====================================');
    console.log("this ", req.admin);
    console.log('====================================');
    res.status(200).json(req.admin);
  } catch (error) {
    console.error("Error in checkAdmin: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
