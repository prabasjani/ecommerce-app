import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white flex items-center justify-between py-5 px-20">
      <h1 className="text-3xl font-bold">
        <span className="text-yellow-400">K</span>umazon
      </h1>

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
        <Link to="/login" className="nav-links">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
