import React from "react";
import useGetProducts from "../hooks/useGetProducts";
import Product from "../components/Product";

const Shop = () => {
  const { products } = useGetProducts();
  return (
    <div className="py-5 px-20 flex flex-col">
      <h1 className="text-3xl text-indigo-600 font-bold text-center">
        All Products
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {products.map((product, index) => {
          return <Product product={product} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Shop;
