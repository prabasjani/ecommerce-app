import express from "express";
import { ProductModel } from "../models/product.model.js";
import { verifyToken } from "./user.route.js";
import { UserModel } from "../models/user.model.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (error) {
    res.status(400).json({ message: "Oops! Something went wrong!" });
  }
});

router.post("/orders", verifyToken, async (req, res) => {
  const { customerID, cartItems } = req.body;
  try {
    const user = await UserModel.findById(customerID);
    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ message: "No user Found" });
    }
    if (products.length !== productIDs.length) {
      return res.status(400).json({ message: "No Product Found" });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ message: "No Product Found" });
      }
      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ message: "Out of Stock" });
      }
      totalPrice += product.price * cartItems[item];
    }
    // Avaiable credits
    if (user.creadits < totalPrice) {
      return res.status(400).json({ message: "Not enough Money to Buy!" });
    }
    user.creadits -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchasedItems: user.purchasedItems });
  } catch (error) {
    res.json(error);
  }
});

router.get("/orders/:userID", verifyToken, async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      res.status(400).json({ message: "No user Found!" });
    }
    const products = await ProductModel.find({
      _id: { $in: user.purchasedItems },
    });

    res.json({ purchasedItems: products });
  } catch (error) {
    console.log(error);
  }
});
export { router as productRouter };
