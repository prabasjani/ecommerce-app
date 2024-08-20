import { useEffect, useState } from "react";
import { createContext } from "react";
import useGetProducts from "../hooks/useGetProducts";
import useGetToken from "../hooks/useGetToken";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const ShopContext = createContext({});
const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [credits, setCredits] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const { products } = useGetProducts();
  const { headers } = useGetToken();
  // const navigate = useNavigate();

  // Available credits
  const fetchUserInfo = async () => {
    try {
      const fetchedUser = await axios.get(
        `http://localhost:3001/user/credits/${localStorage.getItem("userID")}`,
        { headers }
      );
      setCredits(fetchedUser.data.availableCredits);
      setCurrentUser(fetchedUser.data.currUser);
    } catch (error) {
      alert("Error: ");
    }
  };

  const cartItemCount = (itemId) => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    // if (!cartItems[itemId]) return;
    // if (cartItems[itemId] == 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const updateCartCount = (newCount, itemId) => {
    if (newCount < 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: newCount }));
  };

  const cartTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  // This useEffect was used for Fetched Credit points
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const contextValue = {
    addToCart,
    removeFromCart,
    updateCartCount,
    cartItemCount,
    cartTotalAmount,
    cartItems,
    credits,
    currentUser,
  };
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
