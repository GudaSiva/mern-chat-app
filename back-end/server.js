"use strict";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
const port = process.env.PORT || 3003;
import { app, server } from "./socket/socket.js";

// all routes
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/messages.route.js";
import userRouter from "./routes/user.route.js";

// DB connection
import mongoDBConnection from "./db/db-connection.db.js";

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  mongoDBConnection();
  console.log(`Server is running on port ${port}`);
});
