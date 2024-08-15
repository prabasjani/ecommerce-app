import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  creadits: {
    type: Number,
    default: 10000,
  },
});

export const UserModel = model("users", UserSchema);
