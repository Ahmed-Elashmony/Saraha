import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../utils/ErrorHandlling.js";
import Cryptr from "cryptr";
import cloudinary from "../../../utils/cloud.js";

export const allUser = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();
  return res.status(200).json({ message: "Done", users });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { userName, age, phone } = req.body;
  const checkUserName = await userModel.findOne({ userName });
  if (checkUserName) {
    return next(new Error("userName must be unique"));
  }
  const cryptr = new Cryptr(process.env.CrptPHONE);
  const encrptPhone = cryptr.encrypt(phone);
  const user = await userModel.findOneAndUpdate(
    { _id: req.user.id },
    { userName, age, phone: encrptPhone },
    { new: true }
  );
  return res.status(200).json({ message: "Done", user });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.user.id },
    { deleted: true, Online: false },
    { new: true }
  );
  return res.status(200).json({ message: "Done", user });
});

export const profilePic = asyncHandler(async (req, res, next) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `Saraha/user/image/${req.user.id}` }
  );
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      profilePic: { secure_url, public_id },
    },
    { new: true }
  );
  return res.status(200).json({ message: "Done", user });
});

export const profileCover = asyncHandler(async (req, res, next) => {
  const coverImages = [];
  for (const file of req.files) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { folder: `Saraha/user/Cover/${req.user.id}` }
    );
    coverImages.push({ secure_url, public_id });
  }
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    { profileCover: coverImages },
    { new: true }
  );
  return res.status(200).json({ message: "Done", user });
});
