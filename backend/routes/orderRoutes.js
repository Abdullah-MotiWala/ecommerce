import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";
import { authorizerMW } from "../utils.js";
const router = Router();

router.post(
  "/",
  authorizerMW,
  expressAsyncHandler((req, res) => {
    //   destructuring req body
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id
    });
    const createdOrder = order.save();
    res
      .status(201)
      .send({ message: "Order Created Successfully", order: createdOrder });
  })
);

export default router;
