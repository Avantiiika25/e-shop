
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  //cart actions
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';     //toast notifications
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get cart items and login token from Redux store
  const cartItems = useSelector((state) => state.cart?.items || []);
  const token = useSelector((state) => state.auth.token);
  const [coupon, setCoupon] = useState('');              //coupon & discount state
  const [discount, setDiscount] = useState(0);
//price calc
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * 80 * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal - discount + shipping + tax;

  //remove indiviual items
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.error('Removed from Cart');
  };

  //handel remove all items
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart Cleared');
  };

  //apply discount if coupon valid( c-eg:avantika25)
  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === 'save20') {
      setDiscount(200);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  // Handle checkout, check if user is logged in
  const handleCheckout = () => {
    if (!token) {
      toast.error('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    //pass the cart to checkout
    navigate('/checkout', {
      state: { cartItems, couponCode: coupon },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-[#6C3428]">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-[#F5EBDD] p-4 rounded-xl shadow-md"
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
                      ₹{(item.price * 80).toFixed(0)}
                    </p>
                    {item.quantity && (
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          title="Decrease quantity"
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="px-2 bg-[#DFA878] text-white rounded hover:bg-[#BA704F]"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          title="Increase quantity"
                          onClick={() => dispatch(increaseQty(item.id))}
                          className="px-2 bg-[#DFA878] text-white rounded hover:bg-[#BA704F]"
                        >
                          +
                        </button>
                      </div>
                    )}
                    <p className="text-green-600 text-sm mt-1">
                      🚚 Estimated Delivery: 2-3 days
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Coupon Input */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="text"
              placeholder="Apply Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="px-4 py-2 rounded border border-[#BA704F] focus:outline-none focus:ring-2 focus:ring-[#BA704F]"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-[#DFA878] text-white px-5 py-2 rounded hover:bg-[#BA704F] transition"
            >
              Apply
            </button>
          </div>

          {/* Checkout Summary */}
          <div className="mt-8 bg-[#CEE6F3] rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-[#6C3428]">
              📟 Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <p>Subtotal: ₹{subtotal.toFixed(0)}</p>
              <p>
                Shipping: {shipping === 0 ? 'Free Shipping 🚚' : `₹${shipping}`}
              </p>
              <p>Tax (5% GST): ₹{tax.toFixed(0)}</p>
              <p className="text-green-600">Discount: -₹{discount}</p>
              <p className="font-semibold text-[#6C3428] text-lg">
                Grand Total: ₹{grandTotal.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">
                🔒 Secure Checkout | 📲 24/7 Customer Support
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-4">
              <button
                onClick={handleClearCart}
                className="bg-[#DFA878] text-white px-5 py-2 rounded hover:bg-[#BA704F] transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-[#6C3428] text-white px-5 py-2 rounded hover:bg-[#BA704F] transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
