import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { pervOrders, addToCart, cartItemCount } = useContext(ShopContext);
  return (
    <div className="py-5 px-20 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-5">Your Previous Orders</h1>
      <div className="grid grid-cols-6 gap-10 mt-10">
        {pervOrders.map((item, index) => {
          const count = cartItemCount(item._id);
          return (
            <div className="col shadow-md p-5" key={index}>
              <div className="h-[250px]">
                <img src={item.imageURL} width={200} alt="" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold capitalize">
                  {item.productName}
                </h3>
                <p className="text-lg font-extrabold">
                  $. {item.price.toFixed(2)}
                </p>
              </div>

              <button
                className="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-white font-bold mt-3"
                onClick={() => addToCart(item._id)}
              >
                Buy Again {count > 0 && <>({count})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
