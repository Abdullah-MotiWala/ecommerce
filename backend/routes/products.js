import express, { Router } from "express";
import data from "../data.js";
const app = express();
const router = Router();

//#ROUTE:1 fetching all products & Opt:get
router.get("/fetchproducts", (req, res) => {
  res.send(data);
});

//#ROUTE:2 fetching target product & Opt:post
router.get("/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  product ? res.send({ product })
  : res.status(404).send({ message: "Product not found" });
});

// module.exports = router;
export default router;
