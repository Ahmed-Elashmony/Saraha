import { Router } from "express";
const router = Router();
import { validation } from "../../middelware/valdiation.js";
import * as validators from "./validation.js";
import * as messageController from "./controller/message.js";
import auth from "../../middelware/authintication.js";

router.post(
  "/sentMessage",
  auth,
  validation(validators.sentMessage),
  messageController.sentMessage
);

router.get("/getMymessages", auth, messageController.getMymessages);

router.get("/messagesSentToMe", auth, messageController.messagesSentToMe);

router.get(
  "/messageBelongToWhom/:messageId",
  auth,
  messageController.messageBelongToWhom
);

router.put(
  "/updateMessage/:messageId",
  auth,
  validation(validators.update),
  messageController.updateMessage
);

router.delete(
  "/deleteMessage/:messageId",
  auth,
  messageController.deleteMessage
);

export default router;
