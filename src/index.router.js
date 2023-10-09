import userRouter from "./modules/user/user.router.js";
import authRouter from "./modules/auth/auth.router.js";
import messageRouter from "./modules/message/message.router.js";
import connectDB from "../DB/connection.js";
import { globalHandler } from "./utils/ErrorHandlling.js";

const bootstrap = (app, express) => {
  app.use(express.json());

  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/message", messageRouter);

  app.use("*", (req, res) => {
    return res.json({ message: "inVaild Path" });
  });
  app.use(globalHandler);

  connectDB();
};

export default bootstrap;
