import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';

const HomePage = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(product => {
      if (categoryFilter === 'all') return true;
      return product.category === categoryFilter;
    })
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/*  Banner Section */}
      <Banner />

      {/*  Category Filter */}
      <div className="flex flex-wrap gap-3 mt-6 mb-6 justify-center">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-5 py-2 rounded-full font-medium text-sm transition ${
            categoryFilter === 'all'
              ? 'bg-[#BA704F] text-white shadow-md'
              : 'bg-[#F5EBDD] text-black hover:bg-[#DFA878]'
          }`}
        >
          All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setCategoryFilter(cat)}
            className={`capitalize px-5 py-2 rounded-full font-medium text-sm transition ${
              categoryFilter === cat
                ? 'bg-[#BA704F] text-white shadow-md'
                : 'bg-[#F5EBDD] text-black hover:bg-[#DFA878]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/*  Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found for "<strong>{searchQuery}</strong>".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/*  What We Offer Section */}
<section className="mt-16 bg-[#FDF7F0] dark:bg-[#6C3428] rounded-xl p-8 text-center shadow-md">
  {/* 🧑‍💬 About Us Intro */}
  <div className="max-w-3xl mx-auto mb-10">
    <h2 className="text-2xl font-bold text-[#6C3428] dark:text-[#F5EBDD] mb-3">About Us</h2>
    <p className="text-[#6C3428] dark:text-[#F5EBDD] text-sm sm:text-base leading-relaxed">
      We are a modern e-commerce platform dedicated to delivering high-quality products with exceptional service. 
      From fashion to electronics, our mission is to simplify your shopping experience — fast, secure, and enjoyable.
    </p>
  </div>

  {/*  What We Offer Cards */}
  <h2 className="text-2xl font-bold text-[#6C3428] dark:text-[#F5EBDD] mb-6">What We Offer</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[#6C3428] dark:text-[#F5EBDD]">
    {[
      { icon: '🚚', title: 'Free Shipping', desc: 'On all orders above ₹499' },
      { icon: '🔁', title: 'Easy Returns', desc: '7-day hassle-free return policy' },
      { icon: '📞', title: '24/7 Support', desc: 'Friendly help anytime' },
      { icon: '🔒', title: 'Secure Payments', desc: '100% secure and safe checkout' }
    ].map((item, index) => (
      <div
        key={index}
        className="p-4 rounded-lg bg-white dark:bg-[#DFA878] hover:shadow-lg transition-transform hover:scale-105"
      >
        <div className="text-4xl mb-2">{item.icon}</div>
        <h3 className="font-semibold text-[#BA704F] dark:text-[#6C3428]">{item.title}</h3>
        <p className="text-sm text-gray-600 dark:text-black">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

      


    </div>
  );
};

export default HomePage;
