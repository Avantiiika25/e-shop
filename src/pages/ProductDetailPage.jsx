import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import { FaHeart, FaShoppingCart, FaBolt, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  // ✅ Fetch product from API
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setError('Failed to load product'));
  }, [id]);

  // ✅ Add product to cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success('✅ Added to cart!');
  };

  // ✅ Add product to wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    toast.info('💖 Added to wishlist!');
  };

  // ✅ Buy now → add product to cart then go to checkout (NOT success)
  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/checkout'); // only go to checkout page, not success
  };

  // ✅ Increase/Decrease quantity
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Error message if fetch fails
  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-gray-600">⏳ Loading product...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 animate-fadeIn">
      
      {/* ✅ Product Image */}
      <div className="flex-1 bg-[#F5EBDD] rounded-xl p-6 flex justify-center items-center shadow-md hover:scale-105 transition-transform duration-500">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-md h-80 object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* ✅ Product Info */}
      <div className="flex-1 space-y-4 sticky top-24 self-start">
        <h2 className="text-3xl font-bold text-[#BA704F] animate-fadeInUp">{product.title}</h2>
        <p className="text-sm text-gray-500 capitalize">Category: {product.category}</p>

        {/* ✅ Ratings & Offers */}
        <div className="flex items-center gap-3">
          <span className="text-yellow-500 flex items-center gap-1">
            <FaStar /> 4.2 / 5
          </span>
          <span className="bg-[#DFA878] text-xs text-white px-2 py-1 rounded-full">Best Seller</span>
          <span className="bg-[#BA704F] text-xs text-white px-2 py-1 rounded-full">20% Off</span>
        </div>

        {/* ✅ Price */}
        <div className="text-xl text-[#6C3428] font-bold">
          ₹{(product.price * 80).toFixed(0)}
          <span className="text-sm line-through text-gray-400 ml-2">
            ₹{(product.price * 100).toFixed(0)}
          </span>
        </div>

        {/* ✅ Delivery Info */}
        <p className="text-green-600 font-medium">
          🚚 Free Delivery in 2 days | Sold by <span className="font-bold">E-ShopMart</span>
        </p>

        {/* ✅ Description */}
        <p className="text-gray-700 leading-relaxed max-h-40 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-[#DFA878]">
          {product.description}
        </p>

        {/* ✅ Quantity Selector */}
        <div className="flex items-center gap-4 mt-4">
          <label className="text-sm font-medium">Qty:</label>
          <div className="flex items-center border rounded px-2 py-1 gap-2">
            <button onClick={decreaseQty}>
              <FaMinus className="text-[#BA704F]" />
            </button>
            <span className="min-w-[20px] text-center">{quantity}</span>
            <button onClick={increaseQty}>
              <FaPlus className="text-[#BA704F]" />
            </button>
          </div>
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-2 bg-[#BA704F] text-white rounded hover:bg-[#6C3428] transition"
          >
            <FaShoppingCart /> Add to Cart
          </button>

          {/* Wishlist */}
          <button
            onClick={handleAddToWishlist}
            className="flex items-center gap-2 px-5 py-2 bg-[#DFA878] text-white rounded hover:bg-[#BA704F] transition"
          >
            <FaHeart /> Wishlist
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="flex items-center gap-2 px-5 py-2 bg-[#6C3428] text-white rounded hover:bg-[#BA704F] transition"
          >
            <FaBolt /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
