import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import NotificationToast from "./components/NotificationToast";
import OrderHistory from "./components/OrderHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      showNotification(`Updated ${product.name} quantity in cart!`, 'success');
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showNotification(`${product.name} added to cart!`, 'success');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar onSelectCategory={handleCategorySelect}
         />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home addToCart={addToCart} selectedCategory={selectedCategory} showNotification={showNotification}
                />
              }
            />
            <Route path="/add_product" element={<AddProduct showNotification={showNotification} />} />
            <Route path="/product" element={<Product addToCart={addToCart} showNotification={showNotification} />} />
            <Route path="product/:id" element={<Product addToCart={addToCart} showNotification={showNotification} />} />
            <Route path="/cart" element={<Cart showNotification={showNotification} />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/product/update/:id" element={<UpdateProduct showNotification={showNotification} />} />
          </Routes>
          <Footer />
        </div>
        <Chatbot />
        <NotificationToast 
          message={notification.message}
          type={notification.type}
          show={notification.show}
          onClose={hideNotification}
        />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
