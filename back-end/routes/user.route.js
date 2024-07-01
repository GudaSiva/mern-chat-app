import express from "express";
import { protectMiddleware } from "../middleware/protect.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectMiddleware, getUsers);

export default router;
