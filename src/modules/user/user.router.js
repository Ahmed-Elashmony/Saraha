import { Router } from "express";
const router = Router();
import { validation } from "../../middelware/valdiation.js";
import * as validators from "./validation.js";
import * as userController from "./controller/user.js";
import auth from "../../middelware/authintication.js";
import { fileValidation, upload } from "../../utils/multerCloud.js";

router.get("/allUser", auth, userController.allUser);

router.put(
  "/update",
  auth,
  validation(validators.update),
  userController.updateUser
);

router.delete("/delete", auth, userController.deleteUser);

router.put(
  "/profilePic",
  auth,
  upload(fileValidation.image).single("image"),
  userController.profilePic
);

router.put(
  "/profileCover",
  auth,
  upload(fileValidation.image).array("images", 5),
  userController.profileCover
);

export default router;
