import { Schema, model } from "mongoose";

const GroupMessageSchema = new Schema(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("GroupMessage", GroupMessageSchema);
