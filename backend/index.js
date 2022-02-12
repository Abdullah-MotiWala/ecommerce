//configurations
import express from "express";
import cors from "cors";
import router from "./routes/products.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

//api routes
app.use("/api/products", router);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
