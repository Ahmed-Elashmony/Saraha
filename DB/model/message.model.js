import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reciverID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = model("message", messageSchema);
export default messageModel;
