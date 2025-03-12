import Group from "../modules/group.module.js";
import groupMessage from "../modules/groupMessage.module.js";

export const createGroup = async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      members: req.body.members,
    });

    await group.save();

    res.status(201).json({ group });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
