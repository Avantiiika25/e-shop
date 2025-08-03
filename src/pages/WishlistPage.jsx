import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const dispatch = useDispatch();

  // ✅ Access wishlist items & auth token from Redux store
  const wishlist = useSelector((state) => state.wishlist.items);
  const token = useSelector((state) => state.auth.token);

  // ✅ Add to cart from wishlist
  const handleAddToCart = (item) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    dispatch(addToCart(item));
    toast.success(`${item.title.slice(0, 20)}... added to Cart`);
  };

  // ✅ Remove item from wishlist
  const handleRemove = (id) => {
    if (!token) {
      toast.error("Please login to remove items");
      return;
    }

    dispatch(removeFromWishlist(id));
    toast.info("Removed from Wishlist");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-[#6C3428]">💖 Your Wishlist</h2>

      {/* ✅ If wishlist is empty */}
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="mb-4">Your wishlist is empty. Start adding your favorites!</p>
          <Link
            to="/"
            className="px-5 py-2 bg-[#BA704F] text-white rounded hover:bg-[#6C3428] transition"
          >
            🛍 Go Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-[#F5EBDD] p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* ✅ Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-[#6C3428]">{item.title}</h3>
                  <p className="text-[#BA704F] font-medium">
                    ₹{(item.price * 80).toFixed(0)}
                  </p>
                </div>
              </div>

              {/* ✅ Actions - Add to Cart & Remove */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="text-[#6C3428] hover:text-green-600"
                  title="Add to Cart"
                >
                  <FaShoppingCart size={18} />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
