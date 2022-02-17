import express, { Router } from "express";
import expressAsyncHandle from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
const app = express();
const router = Router();

//#ROUTE:1 adding and sending all products & Opt:get
router.get(
  "/fetchproducts",
  expressAsyncHandle(async (req, res) => {
    const createdProduct = await Product.insertMany(data.products);
    res.send({ products: createdProduct });
  })
);

//#ROUTE:2 fetching target product & Opt:post
router.get(
  "/product/:id",
  expressAsyncHandle(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product
      ? res.send({ product })
      : res.status(404).send({ message: "Product not found" });
  })
);

// module.exports = router;
export default router;
