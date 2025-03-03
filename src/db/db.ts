"use server";

import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_DB || "");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  lastLogin: Date,
  logOutTime: Date,
  totalLoginTime: Number,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
