import messageModel from "../../../../DB/model/message.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../utils/ErrorHandlling.js";

export const sentMessage = asyncHandler(async (req, res, next) => {
  const { email, content } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("user u want to sent him not found"), { cause: 404 });
  }
  const reciverID = user._id;
  const createMessage = await messageModel.create({
    userID: req.user.id,
    reciverID,
    content,
  });
  return res.status(200).json({ message: "Done", createMessage });
});

export const getMymessages = asyncHandler(async (req, res, next) => {
  const messages = await messageModel.find({ userID: req.user.id });
  return res.status(200).json({ message: "UR messages", messages });
});

export const messagesSentToMe = asyncHandler(async (req, res, next) => {
  const messages = await messageModel.find({ reciverID: req.user.id });
  return res.status(200).json({ message: "UR messages", messages });
});

export const messageBelongToWhom = asyncHandler(async (req, res, next) => {
  const { messageId } = req.params;
  const messages = await messageModel.findById(messageId);
  const user = await userModel.findById(messages.reciverID);
  return res.status(200).json({ message: "UR messages", user });
});

export const updateMessage = asyncHandler(async (req, res, next) => {
  const { content, email } = req.body;
  const { messageId } = req.params;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("user u want to sent him not found"), { cause: 404 });
  }
  const messages = await messageModel.findByIdAndUpdate(messageId, {
    content,
    reciverID: user._id,
  });
  return res.status(200).json({ message: "Done", messages });
});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { messageId } = req.params;
  const message = await messageModel.findById(messageId);
  if (req.user.id != message?.userID) {
    return next(new Error("U Havent Access"), { cause: 400 });
  }
  const del = await messageModel.deleteOne({ _id: messageId });
  return res.status(200).json({ message: "Done", del });
});
