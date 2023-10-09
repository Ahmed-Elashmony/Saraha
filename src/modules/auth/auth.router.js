import { Router } from "express";
import * as authController from "./controller/auth.js";
import { validation } from "../../middelware/valdiation.js";
import * as validators from "./validation.js";
import auth from "../../middelware/authintication.js";
const router = Router();

router.post("/SignUP", validation(validators.SignUp), authController.SignUp);

router.post("/LogIn", validation(validators.LogIn), authController.LogIn);

router.get("/confirmEmail/:token", authController.confirmEmail);

router.get("/newConfirm/:token", authController.newConfirm);

router.get("/signInPage", authController.signInPage);

router.get("/signUpPage", authController.signUpPage);

router.patch(
  "/changePassword",
  auth,
  validation(validators.changePassword),
  authController.changePassword
);

router.patch("/LogOut", auth, authController.LogOut);

export default router;
