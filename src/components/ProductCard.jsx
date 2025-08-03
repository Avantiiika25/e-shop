import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleAddToCart = () => {
    if (!token) {
      toast.error('Please login to add to cart');
      return;
    }

    dispatch(addToCart(product));
    toast.success('Added to Cart');
  };

  const handleAddToWishlist = () => {
    if (!token) {
      toast.error('Please login to add to wishlist');
      return;
    }

    dispatch(addToWishlist(product));
    toast.info('Added to Wishlist');
  };

  return (
    <div className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 flex flex-col">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-contain p-4 bg-[#FDF7F0]"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-sm font-semibold text-[#6C3428] line-clamp-2 min-h-[3rem] hover:text-[#BA704F] transition">
            {product.title}
          </h2>
        </Link>

        <p className="text-[#BA704F] font-bold text-lg mt-2">
          ₹{(product.price * 80).toFixed(0)}
        </p>

        {/* Action Buttons at the bottom */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={handleAddToWishlist}
            className="flex items-center justify-center gap-2 px-4 py-1 text-sm rounded-full border border-[#BA704F] text-[#BA704F] hover:bg-[#FCE9E0] transition"
          >
            <FaHeart /> Add to Wishlist
          </button>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 px-4 py-1 text-sm rounded-full bg-[#BA704F] text-white hover:bg-[#6C3428] transition"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
