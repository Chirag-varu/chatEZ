import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupPic: {
      type: String,
      default: "https://imgs.search.brave.com/06wGL96yGbHMQl_LtFtpO658KDoeZE5SqJliDkLVOGA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzI3LzE1Lzg5/LzM2MF9GXzEyNzE1/ODkzM19jRFpBNHN1/TVhzeDJuMExRMDNG/enBYNTBSN2ZCYVV4/Mi5qcGc",
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupMessage" }], 
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
