import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const { isAuthenticated } = useContext(ShopContext);

  const logout = () => {
    localStorage.clear();
    setCookies("access_token", null);
    isAuthenticated(false);
  };

  return (
    <>
      <div className="bg-black text-white flex items-center justify-between px-16 py-2">
        <a href="#" className="text-3xl font-bold navBrand">
          <span className="text-yellow-400 tracking-widest">Gad</span>get Hub
        </a>
        {isAuthenticated && <SearchBar />}
        {isAuthenticated && (
          <div className="flex gap-4 font-semibold">
            <Link to="/" className="nav-links">
              Shop
            </Link>
            <Link to="/orders" className="nav-links">
              Orders
            </Link>
            <Link to="/cart" className="nav-links">
              Cart
            </Link>
            <Link to="/login" className="nav-links" onClick={logout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
