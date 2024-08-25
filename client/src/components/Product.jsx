import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = ({ product }) => {
  const { _id, productName, price, imageURL, description, stockQuantity } =
    product;

  const { addToCart, cartItemCount } = useContext(ShopContext);
  const count = cartItemCount(_id);
  return (
    <div className="col bg-white p-5 rounded-md hover:shadow-xl">
      <Link to={`/product/:${_id}`} className="h-[210px] mb-5">
        <img src={imageURL} width={200} alt="" />
      </Link>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold capitalize h-[50px]">{productName}</h3>
        <p className="text-sm my-2 h-[50px]">{description.slice(0, 25)}...</p>
        <p className="text-lg font-extrabold">$. {price.toFixed(2)}</p>
      </div>
      {stockQuantity === 0 ? (
        <h1 className="text-2xl font-extrabold text-red-500 mt-4">
          Out of Stock!
        </h1>
      ) : (
        <button
          className="w-full px-4 py-3 bg-blue-500 rounded-lg hover:bg-blue-600  text-white font-bold mt-3"
          onClick={() => addToCart(_id)}
        >
          Add to Cart {count > 0 && <>({count})</>}
        </button>
      )}
    </div>
  );
};

export default Product;
