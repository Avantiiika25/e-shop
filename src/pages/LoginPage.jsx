import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);   //password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  if (token) return <Navigate to="/" />;

  const validateEmail = (email) =>                              //email regex
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const lowerEmail = email.toLowerCase();

    // Check all fields
    if (!lowerEmail || !password) {
      toast.error("Please fill in all fields");
      return;
    }
   
    // Check email format
    if (!validateEmail(lowerEmail)) {
      toast.error("Invalid email address");
      return;
    }

    // Check password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Get & find matching stored users from localStorage
    const users = JSON.parse(localStorage.getItem("eshopUsers")) || [];
    const matchedUser = users.find(
      (u) => u.email === lowerEmail && u.password === password
    );

    if (!matchedUser) {
      toast.error("User not found or wrong password");      //error if not matched 
      return;
    }

    dispatch(login({ token: "eshop123token", email: lowerEmail }));
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] px-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-[#CEE6F3] p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-[#6C3428]">
          Login to E-Shop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#BA704F] px-4 py-2 rounded focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-[#BA704F] px-4 py-2 rounded pr-10 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-[#BA704F] cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#6C3428] text-white py-2 rounded shadow hover:bg-[#BA704F]"
          >
            Login
          </motion.button>

          <div className="text-center text-sm mt-2 text-[#6C3428]">or login with</div>
          <div className="flex justify-center gap-4 mt-2">
            <button className="flex items-center gap-2 border px-4 py-2 rounded text-[#6C3428] hover:bg-[#fdf2e7] transition">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button className="flex items-center gap-2 border px-4 py-2 rounded text-[#6C3428] hover:bg-[#fdf2e7] transition">
              <FaFacebook className="text-blue-600" /> Facebook
            </button>
          </div>

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-[#BA704F] hover:underline">
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
