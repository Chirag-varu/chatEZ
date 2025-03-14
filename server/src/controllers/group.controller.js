import Group from "../modules/group.module.js";
import groupMessage from "../modules/groupMessage.module.js";

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

    console.log("====================================");
    console.log(formattedGroups);
    console.log("====================================");

    res.status(200).json({ formattedGroups });
  } catch (error) {
    console.log("Error In Get Group: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
