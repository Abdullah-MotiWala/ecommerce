import express, { Router } from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHandle from 'express-async-handler'
const app = express();

const router = Router();

//#ROUTE:1 fetching all users & Opt:get
router.get(
  "/seed",
  expressAsyncHandle(async (req, res) => {
    // await User.remove()
    const createdUser = await User.insertMany(data.users);
    res.send({ users: createdUser });
  })
);

export default router;
