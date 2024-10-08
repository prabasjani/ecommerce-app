import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.route.js";
import { productRouter } from "./routes/product.route.js";

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/products", productRouter);

mongoose.connect(
  "mongodb+srv://prabanjan:thirupathy@ecommerce.tg45d.mongodb.net/ecommerce"
);

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
