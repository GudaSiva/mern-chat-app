"use strict";
import express from "express";
import { logOut, login, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signUp", signUp);
router.post("/logOut", logOut);

export default router;
