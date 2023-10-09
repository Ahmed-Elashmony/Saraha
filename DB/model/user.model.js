import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  phone: String,
  confirmEmail: {
    type: Boolean,
    default: false,
  },
  Online: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  profilePic: { secure_url: String, public_id: String },
  profileCover: [{ secure_url: String, public_id: String }],
});

const userModel = model("user", userSchema);
export default userModel;
