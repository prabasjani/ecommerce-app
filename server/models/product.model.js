import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true, min: [1, "Price must be min 1"] },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  stockQuantity: {
    type: Number,
    required: true,
    min: [0, "stock cant less than 0"],
  },
});

export const ProductModel = model("product", ProductSchema);
