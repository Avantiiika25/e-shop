import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
  // Form state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  // Redirect to homepage if already logged in
  if (token) return <Navigate to="/" />;

  // Email validation
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();

    const lowerEmail = email.toLowerCase();

    // Basic validation checks
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(lowerEmail)) {
      toast.error("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("eshopUsers")) || [];
    const alreadyExists = users.find((u) => u.email === lowerEmail);

    if (alreadyExists) {
      toast.error("User already registered");
      return;
    }

    // Save new user to localStorage
    users.push({ name, email: lowerEmail, password });
    localStorage.setItem("eshopUsers", JSON.stringify(users));

    toast.success("Registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-[#CEE6F3] shadow-lg p-8 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-[#6C3428]">
          Register to E-Shop
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-[#BA704F] px-4 py-2 rounded focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border border-[#BA704F] px-4 py-2 rounded pr-10 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-[#BA704F] cursor-pointer"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#6C3428] text-white py-2 rounded hover:bg-[#BA704F] transition shadow"
          >
            Register
          </motion.button>

          <div className="flex flex-col gap-2 mt-4">
            <button className="flex items-center justify-center gap-2 border px-4 py-2 rounded text-[#6C3428] hover:bg-[#fdf2e7] transition">
              <FaGoogle className="text-red-500" />
              Register with Google
            </button>
            <button className="flex items-center justify-center gap-2 border px-4 py-2 rounded text-[#6C3428] hover:bg-[#fdf2e7] transition">
              <FaFacebook className="text-blue-600" />
              Register with Facebook
            </button>
          </div>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#BA704F] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
