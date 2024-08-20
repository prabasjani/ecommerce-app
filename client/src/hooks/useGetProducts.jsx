import React, { useEffect, useState } from "react";
import axios from "axios";
import useGetToken from "./useGetToken";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    try {
      const fetched = await axios.get("http://localhost:3001/products/", {
        headers,
      });
      setProducts(fetched.data.products);
    } catch (error) {
      alert("Error: Something went Wrong!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};

export default useGetProducts;
