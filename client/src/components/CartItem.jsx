import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartItem = ({ product }) => {
  const { _id, imageURL, productName, price } = product;
  const { addToCart, removeFromCart, updateCartCount, cartItemCount } =
    useContext(ShopContext);
  const cartCount = cartItemCount(_id);
  return (
    <div className="w-[650px] bg-white px-10 py-5 mb-5 flex items-center gap-5 rounded-xl hover:shadow-xl">
      <div className="w-[200px]">
        <img src={imageURL} width={175} alt="" />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-3xl font-bold capitalize ">{productName}</h3>
        <p className="text-lg font-extrabold my-3">
          Price : $.{price.toFixed(2)}
        </p>
        <div className="">
          <button
            className="rounded-l-lg text-2xl bg-red-600 px-5 py-2 text-white font-extrabold"
            onClick={() => removeFromCart(_id)}
          >
            -
          </button>
          <input
            type="number"
            className="w-[75px] p-2 focus: outline-none text-2xl text-center font-bold"
            id="mobile-input"
            value={cartCount}
            onChange={(e) => updateCartCount(e.target.value, _id)}
          />
          <button
            className="rounded-r-lg text-2xl bg-green-600 px-5 py-2 text-white font-extrabold"
            onClick={() => addToCart(_id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
