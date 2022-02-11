import express, { Router } from "express";
import data from "../data.js"
const app = express();
const router = Router();

router.get('/fetchproducts', (req, res) => {res.send(data)});



// module.exports = router;
export default router;