import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateInvoice } from "../utils/invoiceUtils";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // ✅ Get cart items & coupon code
  const cartItems = useSelector((state) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Online");

  // ✅ Calculate subtotal, tax, discount, grandTotal
  const { subtotal, tax, discount, grandTotal } = calculateInvoice(
    cartItems,
    couponCode
  );

  // ✅ Place order and redirect to SuccessPage
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/success", {
      state: { cartItems, couponCode, paymentMethod },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#6C3428] mb-4">
        Checkout
      </h2>

      {/* ✅ Show cart summary */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-[#F5EBDD] p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-[#6C3428]">
                    {item.title}
                  </h3>
                  <p className="text-[#BA704F] font-medium">
                    Qty: {item.quantity} × ₹{(item.price * 80).toFixed(0)}
                  </p>
                </div>
              </div>
              <p className="text-[#6C3428] font-bold">
                ₹{(item.quantity * item.price * 80).toFixed(0)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Coupon Code */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-600">
          Coupon Code
        </label>
        <input
          type="text"
          placeholder="Enter coupon (optional)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full p-2 mt-1 border rounded"
        />
      </div>

      {/* ✅ Payment Method */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-600">
          Select Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 mt-1 border rounded"
        >
          <option value="Online">💳 Online Payment</option>
          <option value="COD">💵 Cash on Delivery</option>
          <option value="UPI">📱 UPI</option>
        </select>
      </div>

      {/* ✅ Order Summary */}
      <div className="bg-white mt-6 p-4 rounded-lg shadow-md space-y-2 text-sm">
        <p>
          <strong>Subtotal:</strong> ₹{subtotal.toFixed(0)}
        </p>
        <p>
          <strong>Tax (5%):</strong> ₹{tax.toFixed(0)}
        </p>
        <p className="text-green-600">
          <strong>Discount:</strong> -₹{discount}
        </p>
        <p className="text-lg font-bold text-[#6C3428]">
          Grand Total: ₹{grandTotal.toFixed(0)}
        </p>
      </div>

      {/* ✅ Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full mt-6 bg-[#BA704F] hover:bg-[#6C3428] text-white py-3 rounded-lg text-lg font-semibold"
      >
        ✅ Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
