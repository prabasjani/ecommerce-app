import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {
  const { credits, currentUser } = useContext(ShopContext);
  return (
    <div className="flex items-center justify-between gap-12 px-20 py-7">
      <div className="">
        <input
          type="text"
          placeholder="Search Products..."
          className="px-5 py-3 w-[500px] border-gray-300 border-2 rounded-full focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-10">
        <h2 className="text-xl font-bold">
          Wallet Bal: $.{credits.toFixed(2)}
        </h2>
        <div className="flex items-center gap-2 border-2 rounded-lg px-5 py-3">
          <img
            src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
            alt={currentUser}
            className="rounded-full"
            width={25}
          />
          <select className="border-none outline-none bg-transparent font-bold">
            <option className="p-4" value="">
              {currentUser.toUpperCase()}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
