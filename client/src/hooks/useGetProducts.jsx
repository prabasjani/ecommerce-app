import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import useGetToken from "./useGetToken";
import { ShopContext } from "../context/ShopContext";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();
  const { isAuthenticated } = useContext(ShopContext);

  const fetchProducts = async () => {
    try {
      const fetched = await axios.get("http://localhost:3001/products/", {
        headers,
      });
      setProducts(fetched.data.products);
    } catch (error) {
      // alert("Error: Something went Wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};

export default useGetProducts;
