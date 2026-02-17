import React, { useContext, useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {

  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if(data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
   if(user) {
     fetchOrders();
   }
  }, [user]);

  return (
    <div className="mt-10 pb-16 flex justify-center">
      <div className="w-full max-w-4xl">

        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

        {myOrders.map((order, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-5 mb-6 bg-white"
          >

            {/* Top Row */}
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <p>Order ID: {order._id}</p>
              <p>Payment: {order.paymentType}</p>
              <p>TotalAmount: ${order.amount}</p>
            </div>

            {/* Items */}
            {order.items && order.items.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-4
                ${order.items.length - index - 1 && "border-b"}`}
              >

                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/images/${item.product?.image?.[0]}`}
                    alt=""
                    className="w-14 h-14 object-cover"
                  />

                  <div>
                    <p className="font-medium">{item.product?.name || "Product removed"}</p>
                    <p className="text-sm text-gray-500">
                      {item.product?.category || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Middle */}
                <div className="text-sm text-gray-600">
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {item.status || order.status || "Order Placed"}</p>
                  <p>
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Right */}
                <p className="font-medium">
                  Amount: ${(item.product?.offerPrice || 0) * item.quantity}
                </p>

              </div>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
};

export default MyOrders;
