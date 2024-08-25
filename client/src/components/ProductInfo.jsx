import React, { useContext } from "react";
import useGetProducts from "../hooks/useGetProducts";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductInfo = () => {
  const { id } = useParams();
  const { products } = useGetProducts();
  const item = products.find((product) => id !== product._id);
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div className="w-[1200px] h-[500px] mt-20 border p-10 flex items-center gap-10 bg-white rounded-lg hover:shadow-lg">
        <div className="">
          <img src={item?.imageURL} alt="" className="w-[500px]" />
        </div>
        <div className="flex flex-col items-start justify-between gap-5">
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-4xl font-bold text-black">
              {item?.productName.toUpperCase()}
            </h1>
            <p className="text-2xl text-slate-600">{item?.description}</p>
            <h2 className="text-xl font-bold">
              Price: $.{item?.price.toFixed(2)}
            </h2>
            <p>
              Delivery:{" "}
              {item?.price > 50
                ? "Free Delivery"
                : `$.${item?.price * 0.1}.00 + ${item?.price}.00`}
            </p>
          </div>
          <div className="flex gap-5">
            <button
              className="px-5 py-3 font-bold bg-blue-500 rounded-lg text-white"
              onClick={() => addToCart(id)}
            >
              Add to Cart
            </button>
            <button
              className="px-5 py-3 font-bold bg-red-500 rounded-lg text-white"
              onClick={() => navigate("/")}
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
