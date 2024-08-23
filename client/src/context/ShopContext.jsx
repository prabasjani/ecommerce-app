import { useEffect, useState } from "react";
import { createContext } from "react";
import useGetProducts from "../hooks/useGetProducts";
import useGetToken from "../hooks/useGetToken";
import axios from "axios";
import { useCookies } from "react-cookie";

export const ShopContext = createContext({});
const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [credits, setCredits] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const { products } = useGetProducts();
  const { headers } = useGetToken();
  const [pervOrders, setPrevOrders] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    cookies.access_token !== null
  );

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
      // alert("Error: Oops! Something went wrong!");
      console.log(error);
    }
  };

  const fetchPrevOrders = async () => {
    try {
      const fetchedProducts = await axios.get(
        `http://localhost:3001/products/orders/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setPrevOrders(fetchedProducts.data.purchasedItems);
    } catch (error) {
      // alert("Error: Oops! Something went wrong!");
      console.log(error);
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
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] == 0) return;
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

  // This useEffect was used for Fetched Credit points and Previous Orders
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
      fetchPrevOrders();
    }
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
    fetchUserInfo,
    setCartItems,
    pervOrders,
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
