import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    removeFromcarts,
    updateCartItem,
    axios,
    user,
    setCartItems,
  } = useContext(AppContext);

  const [cartArray, setCartArray] = useState([]);

  // address
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // payment
  const [paymentOption, setPaymentOption] = useState("COD");
  const [showPayment, setShowPayment] = useState(false);

  // build cart array
  const getCart = () => {
    const temp = [];
    for (const key in cartItems) {
      const product = products.find((p) => p._id === key);
      if (product) temp.push({ ...product, quantity: cartItems[key] });
    }
    setCartArray(temp);
  };

  // fetch address
  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { if (user) getAddress(); }, [user]);
  useEffect(() => { if (products.length > 0 && cartItems) getCart(); }, [products, cartItems]);

  const finalAmount = totalCartAmount() + (totalCartAmount() * 2) / 100;

  // place order
  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({ product: item._id, quantity: item.quantity })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else toast.error(data.message);
      } else setShowPayment(true);

    } catch (error) {
      toast.error(error.message);
    }
  };

  return products.length > 0 && cartItems ? (
    <>
      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">

        {/* LEFT */}
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart <span className="text-sm text-indigo-500">{cartCount()} Items</span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p>Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {cartArray.map((product, index) => (
            <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3 text-gray-600">
              <div className="flex gap-4 items-center">
                <img src={`http://localhost:5000/images/${product.image[0]}`} alt={product.name}
                  className="w-24 h-24 object-cover border rounded" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span>Qty:</span>
                    <select value={cartItems[product._id]}
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}>
                      {[...Array(9)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <p className="text-center">${product.offerPrice * product.quantity}</p>

              <button onClick={() => removeFromcarts(product._id)} className="text-red-500 mx-auto">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="max-w-[360px] w-full bg-gray-100 p-5 border relative">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <hr className="my-4" />

          <p className="text-sm font-medium">Delivery Address</p>

          <div className="relative mt-2">
            <div className="flex justify-between items-start">
              <p className="text-gray-600 max-w-[80%]">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}`
                  : "No address found"}
              </p>

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-indigo-500 text-sm hover:underline whitespace-nowrap"
              >
                Change
              </button>
            </div>
            {showAddress && (
              <div className="absolute top-10 left-0 bg-white border w-full text-sm z-50 shadow">
                {address.map(addr => (
                  <p key={addr._id}
                    onClick={() => { setSelectedAddress(addr); setShowAddress(false); }}
                    className="p-2 hover:bg-gray-100 cursor-pointer">
                    {addr.street}, {addr.city}
                  </p>
                ))}

                <p onClick={() => navigate("/add-address")}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10 border-t">
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium mt-4">Payment Method</p>
          <select className="w-full border px-3 py-2 mt-2"
            onChange={(e) => setPaymentOption(e.target.value)}>
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>

          <hr className="my-4" />

          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between"><span>Price</span><span>${totalCartAmount()}</span></p>
            <p className="flex justify-between"><span>Tax (2%)</span><span>${(totalCartAmount() * 2) / 100}</span></p>
            <p className="flex justify-between font-semibold text-lg"><span>Total</span><span>₹{finalAmount}</span></p>
          </div>

          <button onClick={placeOrder} className="w-full py-3 mt-5 bg-indigo-600 text-white">
            {paymentOption === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[320px] text-center">
            <h2 className="text-lg font-semibold mb-4">Scan & Pay</h2>
            <QRCodeSVG value={`upi://pay?pa=yourupi@upi&pn=Your%20Store&am=${finalAmount}&cu=INR`} size={200} />
            <button onClick={() => { setShowPayment(false); setCartItems({}); navigate("/my-orders"); }}
              className="w-full mt-4 py-2 bg-green-600 text-white rounded">Payment Done</button>
          </div>
        </div>
      )}
    </>
  ) : null;
};

export default Cart;
