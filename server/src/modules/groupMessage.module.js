import { Schema, model } from "mongoose";

const groupMessageSchema = new Schema(
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

const groupMessage =  model("GroupMessage", groupMessageSchema);

export default groupMessage;
