import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email, mobile } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    return res.status(400).json({ message: "Username is already exists!" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    password: hashedPwd,
    email,
    mobile,
  });
  await newUser.save();
  res.json({ message: "User Registered Succesfully!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "No user found!" });
  }

  const verifyPwd = await bcrypt.compare(password, user.password);
  if (!verifyPwd) {
    return res.json({ message: "Incorrect Password!" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({
    message: `Welcome ${user.username.toUpperCase()}`,
    token,
    userID: user._id,
  });
});
// Middleware for login
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  }
  return res.sendStatus(401);
};
export { router as userRouter };
