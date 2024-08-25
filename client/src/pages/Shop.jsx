import React, { useContext } from "react";
import useGetProducts from "../hooks/useGetProducts";
import Product from "../components/Product";
import { ShopContext } from "../context/ShopContext";
import { Navigate } from "react-router-dom";

const Shop = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="py-5 px-20 flex flex-col">
      <h1 className="text-3xl text-indigo-600 font-bold text-center">
        All Products
      </h1>
      <div className="grid grid-cols-6 gap-5 mt-10">
        {products.map((product, index) => {
          return <Product product={product} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Shop;
