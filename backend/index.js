//configurations
import express from "express";
import cors from "cors";
import productRouter from "./routes/products.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import connectingMongoose from "./db.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dotenv.config({ path: __dirname, '../.env' });
// dotenv.config({path: path.join(__dirname, '../', '.env')});
// // dotenv.config({path: '../.env'})
// console.log(dotenv.config({ path: "../.env" }));
// dotenv.config({ path: path.resolve("../.env") });
// dotenv.config({path:'../.env'})
// console.log(dotenv.config({path:'../.env'}));
const dotCon = dotenv.config({ path: ".env" });

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

//api router ROUTE : 3
app.use("/api/orders", orderRouter);
//home
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
