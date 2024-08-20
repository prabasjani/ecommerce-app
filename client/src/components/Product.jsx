import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Product = ({ product }) => {
  const { _id, productName, price, imageURL, description, stockQuantity } =
    product;

  const { addToCart, cartItemCount } = useContext(ShopContext);
  const count = cartItemCount(_id);
  return (
    <div className="col shadow-md p-5">
      <div className="h-[250px]">
        <img src={imageURL} width={200} alt="" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold capitalize">{productName}</h3>
        <p className="text-sm my-3">{description}</p>
        <p className="text-lg font-extrabold">$. {price}.00</p>
      </div>
      {stockQuantity === 0 ? (
        <h1 className="text-2xl font-extrabold text-red-500 mt-4">
          Out of Stock!
        </h1>
      ) : (
        <button
          className="px-10 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold mt-3"
          onClick={() => addToCart(_id)}
        >
          Add to Cart {count > 0 && <>({count})</>}
        </button>
      )}
    </div>
  );
};

export default Product;
