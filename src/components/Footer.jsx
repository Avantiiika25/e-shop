import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';   //icons
import { motion, AnimatePresence } from 'framer-motion';
import TermsAndConditions from './TermsAndConditions';

const Footer = () => { 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState(''); // 'error' or 'success'
  const [showTerms, setShowTerms] = useState(false);

  const validateEmail = (email) =>                                  //email regex
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = () => {
    if (!email.trim()) {
      setType('error');
      setMessage('Please enter an email address.');
    } else if (!validateEmail(email)) {
      setType('error');
      setMessage('Please enter a valid email address.');
    } else {
      setType('success');
      setMessage('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#6C3428] text-[#F5EBDD] mt-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Company web  Info */}
        <div>
          <h3 className="text-2xl font-bold text-[#DFA878] mb-3">E-Shop</h3>
          <p className="text-sm">Your go-to store for the best products at the best prices!</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#BA704F]">Home</a></li>
            <li><a href="/cart" className="hover:text-[#BA704F]">Cart</a></li>
            <li><a href="/wishlist" className="hover:text-[#BA704F]">Wishlist</a></li>
            <li><a href="/login" className="hover:text-[#BA704F]">Login</a></li>
            <li>
              <button
                onClick={() => setShowTerms(true)}
                className="hover:text-[#BA704F] underline"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm">📧 support@eshop.com</p>
          <p className="text-sm">📞 +91 9876543210</p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#"><FaFacebook className="hover:text-[#BA704F]" /></a>
            <a href="#"><FaInstagram className="hover:text-[#BA704F]" /></a>
            <a href="#"><FaTwitter className="hover:text-[#BA704F]" /></a>
            <a href="#"><FaLinkedin className="hover:text-[#BA704F]" /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Subscribe to Newsletter</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage('');
            }}
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-md border border-[#DFA878] bg-[#F5EBDD] text-black placeholder:text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BA704F]"
          />
          <button
            onClick={handleSubscribe}
            className="mt-3 w-full bg-[#BA704F] text-white py-2 rounded-md hover:bg-[#DFA878] transition"
          >
            Subscribe
          </button>

          <AnimatePresence>
            {message && (
              <motion.p
                key="message"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`mt-2 text-sm ${type === 'error' ? 'text-red-300' : 'text-green-300'}`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-xs text-[#F5EBDD] py-4 border-t border-[#DFA878]">
        © 2025 E-Shop by Avantika Gondal. All rights reserved.
      </div>

      {/* T&C */}
      <TermsAndConditions show={showTerms} onClose={() => setShowTerms(false)} />
    </footer>
  );
};

export default Footer;
