import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupPic: {
      type: String,
      default: "https://imgs.search.brave.com/7yvnOo5p1WkyZWXxyy781yIzQH35ygTpxopFYwd6Tf4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNkYi5jb20v/aWNvbnMvcHJldmll/dy9ncmF5L2dyb3Vw/LXh4bC5wbmc",
    }
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
