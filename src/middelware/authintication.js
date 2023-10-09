import userModel from "../../DB/model/user.model.js";
import { asyncHandler } from "../utils/ErrorHandlling.js";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  if (!token?.startsWith(process.env.Barer_Token)) {
    return next(new Error("token is required or invaild"));
  }
  const auth = token.split(process.env.Barer_Token)[1];
  if (!auth) {
    return next(new Error("token required"));
  }
  const decoded = jwt.verify(auth, process.env.TOKEN_SIGN);
  if (!decoded?.id) {
    return next(new Error("inVaild Payload"));
  }
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(new Error("Not Registered"));
  }
  if (!user.Online) {
    return next(new Error("Login First"));
  }
  if (user.deleted) {
    return next(
      new Error("Deleted Account Login Before 1th day of this month")
    );
  }
  req.user = user;
  return next();
});

export default auth;
