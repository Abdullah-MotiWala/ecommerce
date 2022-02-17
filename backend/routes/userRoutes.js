import express, { Router } from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHandle from "express-async-handler";
import { generateToken } from "../utils.js";
const app = express();

const router = Router();

//#ROUTE:1 adding all users & Opt:get
router.get(
  "/seed",
  expressAsyncHandle(async (req, res) => {
    // await User.remove()
    const createdUser = await User.insertMany(data.users);
    res.send({ users: createdUser });
  })
);

//#ROUTE:2 sing in & Opt:post
router.post(
  "/signin",
  expressAsyncHandle(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      });
      return;
    }
    res.status(401).send({ message: "Cedentials not found" });
  })
);
export default router;
