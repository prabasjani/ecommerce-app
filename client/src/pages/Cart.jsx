import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import useGetProducts from "../hooks/useGetProducts";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import useGetToken from "../hooks/useGetToken";
import axios from "axios";

const Cart = () => {
  const { products } = useGetProducts();
  const { headers } = useGetToken();
  const { cartItemCount, cartTotalAmount, cartItems } = useContext(ShopContext);
  const totalAmount = cartTotalAmount();
  const navigate = useNavigate();

  const checkout = async () => {
    try {
      // its literally in server routes /orders
      const body = { customerID: localStorage.getItem("userID"), cartItems };
      await axios.post("http://localhost:3001/products/orders", body, {
        headers,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold text-center my-10">Your Cart Items</h1>
      <div className="flex flex-col items-center justify-center">
        {products.map((product, index) => {
          if (cartItemCount(product._id) !== 0) {
            return <CartItem product={product} key={index} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="flex flex-col items-end my-10">
          <h1 className="text-3xl font-bold mb-4">
            Total Amount: $.{totalAmount.toFixed(2)}
          </h1>
          <div className="flex gap-10">
            <button
              className="px-10 py-4 bg-black text-white rounded-2xl"
              onClick={() => navigate("/")}
            >
              Continue to Shop
            </button>
            <button
              className="px-10 py-4 bg-black text-white rounded-2xl"
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-red-500 text-center">
          No Product in your Cart!
        </h1>
      )}
    </div>
  );
};

export default Cart;
