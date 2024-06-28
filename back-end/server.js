"use strict";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3003;
const app = express();
import authRouter from "./routes/auth.route.js";
import mongoDBConnection from "./db/db-connection.db.js";

app.use(express.json());
app.use("/api/auth", authRouter);
app.listen(port, () => {
  mongoDBConnection();
  console.log(`Server is running on port ${port}`);
});
