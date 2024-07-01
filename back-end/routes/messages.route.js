"use strict";
import express from "express";
import { getMessages, sendMessage } from "../controllers/messages.controller.js";
import { protectMiddleware } from "../middleware/protect.middleware.js";

const router = express.Router();

router.get("/:id", protectMiddleware,getMessages);
router.post("/send/:id", protectMiddleware, sendMessage);

export default router;
