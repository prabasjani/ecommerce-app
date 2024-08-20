import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShopContextProvider from "./context/ShopContext";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <ShopContextProvider>
      <Router>
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
};

export default App;
