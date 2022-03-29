import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";
import { authorizerMW, isAdmin } from "../utils.js";
const router = Router();

// ROUTE:1 creating order
router.post(
  "/",
  authorizerMW,
  expressAsyncHandler(async (req, res) => {
    //   destructuring req body
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
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
    const createdOrder = await order.save();
    res
      .status(201)
      .send({ message: "Order Created Successfully", order: createdOrder });
  })
);

//ROUTE:2 finding order
router.get(
  "/:id",
  authorizerMW,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    order
      ? res.send(order)
      : res.status(404).send({ message: "Order Not Found" });
  })
);

// ROUTE:3 updating order status to paid
router.put(
  "/:id/pay",
  authorizerMW,
  expressAsyncHandler(async (req, res) => {
    console.log("pak")
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updateOrder = await order.save();
      res.status(200).send({ message: "Order Paid", order: updateOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

router.delete(
  "/:id",
  authorizerMW,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: "Order Deleted", order: deleteOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

router.put(
  "/:id/deliver",
  authorizerMW,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
export default router;
