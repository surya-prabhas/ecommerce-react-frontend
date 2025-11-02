import React, { useEffect, useState } from "react";
import Home from "./Home"
import axios from "axios";
// import { json } from "react-router-dom";
// import { BiSunFill, BiMoon } from "react-icons/bi";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults,setShowSearchResults] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    fetchData();
    updateCartCount();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    setCartCount(count);
  };



  const fetchData = async (value) => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true)
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${value}`
      );
      setSearchResults(response.data);
      setNoResults(response.data.length === 0);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  
  // const handleChange = async (value) => {
  //   setInput(value);
  //   if (value.length >= 1) {
  //     setShowSearchResults(true);
  //     try {
  //       let response;
  //       if (!isNaN(value)) {
  //         // Input is a number, search by ID
  //         response = await axios.get(`http://localhost:8080/api/products/search?id=${value}`);
  //       } else {
  //         // Input is not a number, search by keyword
  //         response = await axios.get(`http://localhost:8080/api/products/search?keyword=${value}`);
  //       }

  //       const results = response.data;
  //       setSearchResults(results);
  //       setNoResults(results.length === 0);
  //       console.log(results);
  //     } catch (error) {
  //       console.error("Error searching:", error.response ? error.response.data : error.message);
  //     }
  //   } else {
  //     setShowSearchResults(false);
  //     setSearchResults([]);
  //     setNoResults(false);
  //   }
  // };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };
  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top premium-navbar" style={{
          background: 'var(--navbar_background)',
          border: '2px solid #FFD700',
          borderRadius: '0',
          margin: '8px',
          boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          position: 'fixed',
          zIndex: 9999,
          overflow: 'visible'
        }}>
          <div className="shimmer-overlay" style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
            animation: 'shimmer 3s infinite'
          }}></div>
          
          <div className="container-fluid position-relative" style={{ zIndex: 2 }}>
            <div className="navbar-brand d-flex align-items-center premium-brand" href="/" style={{ textDecoration: 'none' }}>
              <div className="sp-logo-icon me-2" style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #FFD700, #FF69B4, #8A2BE2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '900',
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}>SP</span>
                <div className="logo-shine" style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  animation: 'logoShine 2s infinite'
                }}></div>
              </div>
              <span style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: '700',
                fontSize: '1.4rem',
                background: 'linear-gradient(135deg, #FFD700, #FF69B4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}>SP ECOM</span>
            </div>
            <button
              className="navbar-toggler premium-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                border: '1px solid #FFD700',
                borderRadius: '8px'
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                <li className="nav-item">
                  <a className="nav-link premium-nav-link active" aria-current="page" href="/" style={{
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link premium-nav-link" href="/add_product" style={{
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}>
                    Add Product
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle premium-nav-link"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    Categories
                  </a>

                  <ul className="dropdown-menu premium-dropdown" style={{
                    border: '1px solid #FFD700',
                    borderRadius: '8px',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)',
                    zIndex: 10000,
                    position: 'absolute'
                  }}>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item premium-dropdown-item"
                          onClick={() => handleCategorySelect(category)}
                          style={{
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <button className="theme-btn premium-theme-btn" onClick={() => toggleTheme()} style={{
                border: '1px solid #FFD700',
                borderRadius: '8px',
                background: 'transparent',
                transition: 'all 0.3s ease',
                marginRight: '1rem'
              }}>
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>
              <div className="d-flex align-items-center">
                <a href="/cart" className="nav-link premium-cart-link position-relative" style={{
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  marginRight: '1rem'
                }}>
                  <i className="bi bi-cart me-2" style={{ fontSize: '1.2rem' }}></i>
                  Cart
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                      {cartCount}
                    </span>
                  )}
                </a>
                {/* <form className="d-flex" role="search" onSubmit={handleSearch} id="searchForm"> */}
                <div style={{ position: 'relative' }}>
                  <input
                    className="form-control me-2 premium-search"
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    style={{
                      border: '1px solid #FFD700',
                      borderRadius: '25px',
                      padding: '8px 16px',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
                {showSearchResults && (
                  <ul className="list-group" style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    left: 'auto',
                    zIndex: 1000,
                    width: '250px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    marginTop: '4px',
                    backgroundColor: 'white'
                  }}>
                    {searchResults.length > 0 ? (  
                        searchResults.map((result) => (
                          <li key={result.id} className="list-group-item">
                            <a href={`/product/${result.id}`} className="search-result-link">
                            <span>{result.name}</span>
                            </a>
                          </li>
                        ))
                    ) : (
                      noResults && (
                        <p className="no-results-message">
                          No Prouduct with such Name
                        </p>
                      )
                    )}
                  </ul>
                )}
                {/* <button
                  className="btn btn-outline-success"
                  onClick={handleSearch}
                >
                  Search Products
                </button> */}
                {/* </form> */}
                <div />
              </div>
            </div>
          </div>
        </nav>
      </header>

    </>
  );
};

// Premium navbar animations and styles
const navbarStyle = document.createElement('style');
navbarStyle.textContent = `
  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  
  @keyframes logoShine {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
  
  .premium-navbar {
    backdrop-filter: blur(10px);
  }
  
  .sp-logo-icon:hover {
    transform: rotate(5deg) scale(1.1) !important;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5) !important;
  }
  
  .premium-nav-link:hover {
    color: #FFD700 !important;
    transform: translateY(-1px);
  }
  
  .premium-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #FFD700, #FF69B4);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  .premium-nav-link:hover::after {
    width: 80%;
  }
  
  .premium-theme-btn:hover {
    background: linear-gradient(135deg, #FFD700, #FF69B4) !important;
    color: white !important;
    transform: scale(1.05);
  }
  
  .premium-cart-link:hover {
    color: #FFD700 !important;
    transform: scale(1.05);
  }
  
  .premium-search:focus {
    border-color: #FF69B4 !important;
    box-shadow: 0 0 0 0.2rem rgba(255, 105, 180, 0.25) !important;
    outline: none !important;
  }
  
  .premium-dropdown {
    background: var(--card-bg-clr) !important;
    z-index: 10000 !important;
    position: absolute !important;
  }
  
  .navbar.fixed-top {
    z-index: 9999 !important;
  }
  
  .dropdown-menu.show {
    z-index: 10000 !important;
    position: absolute !important;
  }
  
  .premium-dropdown-item:hover {
    background: linear-gradient(135deg, #FFD700, #FF69B4) !important;
    color: white !important;
  }
  
  @media (max-width: 768px) {
    .premium-navbar {
      margin: 4px !important;
    }
    
    .sp-logo-icon {
      width: 35px !important;
      height: 35px !important;
    }
    
    .navbar-brand span {
      font-size: 1.2rem !important;
    }
  }
`;

if (!document.head.querySelector('style[data-navbar-styles]')) {
  navbarStyle.setAttribute('data-navbar-styles', 'true');
  document.head.appendChild(navbarStyle);
}

export default Navbar;
