# 🛒 E-Shop — React + Redux E-commerce Website

**E-Shop** is a fully responsive, feature-rich E-commerce web app built using **ReactJS**, **Redux Toolkit**, **Tailwind CSS**, **React Router DOM**, and **Vite**. It supports cart/wishlist management, login/register, protected routes, checkout flow, and PDF invoice download — all styled with a custom color palette.

---
## 🎥 Project Demo
✨ Experience E-Shop in Action!

🚀 Live Demo 
https://e-shop-zeta-murex.vercel.app/
---

## 🚀 Features

🔐 User Login & Validation
🛍️ Add to Cart / Wishlist Functionality
📦 Product Listings with Category Filters 
💬 Search Functionality
🧾 Invoice PDF Download after Successful Order
🧮 Coupon Code Discounts
🚚 Dynamic Address Management (Add / Select / Remove)
💳 Multiple Payment Methods with Conditional Inputs
🔁 Redux State Management (cartSlice, authSlice, wishlistSlice)
💡 Toast Notifications for Feedback
🧪 Unit Testing with React Testing Library + Vitest
📱 Responsive Design with TailwindCSS + Animations
🎨 Custom Color Palette (ColorHunt)
💾 LocalStorage Integration for Cart, Wishlist, and Addresses



---

## 🎨 Color Palette (ColorHunt)

| Color           | Hex        |
|----------------|------------|
| Dark Brown     | `#6C3428`  |
| Burnt Orange   | `#BA704F`  |
| Sand           | `#DFA878`  |
| Soft Cream     | `#CEE6F3`  |

---

## 📁 Folder Structure

E-Shop/
├── public/
├── src/
│   ├──__tests__
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   │   └── slices/
│   ├── routes/
│   ├── tests/
│   └── App.jsx
│
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md


## Framework / Dependencies

ReactJS - https://reactjs.org/
React-redux - https://react-redux.js.org/
Redux-thunk - https://github.com/reduxjs/redux-thunk
TailwindCSS - https://tailwindcss.com/
react-router-dom - https://www.npmjs.com/package/react-router-dom
react-icons - https://react-icons.github.io/react-icons/
react-toastify - https://www.npmjs.com/package/react-toastify  
jsPDF - https://github.com/parallax/jsPDF  
jspdf-autotable - https://github.com/simonbengtsson/jsPDF-AutoTable  
React Testing Library - https://testing-library.com/docs/react-testing-library/intro/  
Vitest - https://vitest.dev/🛠 


## How to Run Locally (Clone + Install + Run)

# 1. Clone the repository
git clone https://github.com/Avantiiika25/e-shop.git

# 2. Navigate into the project directory
cd e-shop

# 3. Install all dependencies
npm install

# 4. Run the development server
npm run dev

## Testing

| File                           | Description                                                   |
| ------------------------------ | ------------------------------------------------------------- |
| `CartPage.test.jsx`          - | Tests adding/removing items, quantity updates, and empty cart |
| `FAQ.test.jsx`               - | Verifies FAQ toggle behavior                                  |
| `Footer.test.jsx`            - | Checks static footer content rendering                        |
| `Header.test.jsx`            - | Validates nav links and login/logout visibility               |
| `ProtectedRoute.test.jsx`    - | Ensures redirection based on authentication status            |
| `SplashScreen.test.jsx`      - | Tests logo, heading, and subheading display                   |
| `TermsAndConditions.test.jsx`- | Tests modal rendering and close functionality                 |

# Testing Setup
Install all testing dependencies:

npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

# Run Tests
# To execute all unit tests:

npx vitest

# To run in watch mode (re-runs on file save):

npx vitest --watch
# Eshop-by-avantika
# Eshop-by-avantika
# e-shop
