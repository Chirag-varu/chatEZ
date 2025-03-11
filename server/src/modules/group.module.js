import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    members: [{ type: Schema.Types.ObjectId, ref: "User" }], 
    messages: [{ type: Schema.Types.ObjectId, ref: "GroupMessage" }], 
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
