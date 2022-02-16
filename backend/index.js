//configurations
import express from "express";
import cors from "cors";
import productRouter from "./routes/products.js";
import userRouter from "./routes/userRoutes.js";
import connectingMongoose from "./db.js";
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
//connectingMongoose
connectingMongoose();

//errorhandler using expressasynchandler
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

//api routes ROUTE : 1
app.use("/api/products", productRouter);

//api routes ROUTE : 2
app.use("/api/users", userRouter);

//home
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
