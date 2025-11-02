import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import StarRating from "./StarRating";
import unplugged from "../assets/unplugged.png"

const Home = ({ selectedCategory, showNotification }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <div className="text-center">
          <img src={unplugged} alt="Error" className="mb-3" style={{ width: '80px', height: '80px', opacity: 0.6 }}/>
          <h3 className="text-muted fw-light">Unable to load products</h3>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div className="hero-section d-flex align-items-center justify-content-center" style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)'
        }}></div>
        
        <div className="text-center hero-content position-relative" style={{ zIndex: 2 }}>
          <div className="logo-animation mb-5" style={{ animation: 'logoZoomIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <div className="sp-creative-logo mx-auto position-relative" style={{
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              marginBottom: '3rem',
              transform: 'perspective(1000px) rotateX(5deg)',
              transition: 'all 0.4s ease'
            }}>
              <span style={{ 
                fontSize: '4rem', 
                fontWeight: '900', 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '-2px'
              }}>SP</span>
              <div className="logo-glow" style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                right: '-10px',
                bottom: '-10px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '35px',
                opacity: 0.3,
                filter: 'blur(20px)',
                zIndex: -1,
                animation: 'pulse 2s infinite'
              }}></div>
            </div>
          </div>
          
          <div style={{ animation: 'fadeInUp 1s ease-out 0.3s both' }}>
            <h1 className="display-2 fw-bold mb-3" style={{ 
              color: 'white',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '1px',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)'
            }}>
              Surya Prabhas E-Commerce
            </h1>
            
            <p className="lead mb-5" style={{ 
              fontSize: '1.4rem', 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '300',
              letterSpacing: '0.5px',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              maxWidth: '600px',
              margin: '0 auto 3rem'
            }}>
              Smart. Stylish. Simplified Shopping.
            </p>
            
            <button 
              className="btn btn-lg px-5 py-3 explore-btn" 
              style={{ 
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: '600',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                border: 'none',
                color: '#2c3e50 !important',
                background: 'white !important'
              }}
              onClick={() => setShowLanding(false)}
            >
              <span style={{ color: '#2c3e50 !important' }}>Explore Products</span>
              <i className="bi bi-arrow-right ms-2" style={{ color: '#2c3e50 !important' }}></i>
            </button>
          </div>
        </div>
        
        <div className="floating-elements">
          <div className="float-1" style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          <div className="float-2" style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '40px',
            height: '40px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite reverse'
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-5" style={{ marginTop: "80px" }}>
      {filteredProducts.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <div className="text-center">
            <i className="bi bi-box-seam display-1 mb-3" style={{ color: 'var(--para-clr)', opacity: 0.6 }}></i>
            <h3 className="fw-light" style={{ color: 'var(--para-clr)' }}>No Products Available</h3>
          </div>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="fw-light mb-1">Our Products</h2>
              <div className="mx-auto" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #007bff, #0056b3)', borderRadius: '2px' }}></div>
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            padding: '2rem 0'
          }}>
            {filteredProducts.map((product) => {
              const { id, brand, name, price, productAvailable, imageUrl, averageRating = 0, reviewCount = 0, salePrice } = product;
              return (
                <div key={id} style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '1rem',
                  background: 'var(--card-bg-clr)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      width: '100%',
                      height: '220px',
                      marginBottom: '1rem',
                      overflow: 'hidden',
                      borderRadius: '8px'
                    }}>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {!productAvailable && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px'
                        }}>
                          <span className="badge bg-danger">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'var(--para-clr)',
                      margin: '0 0 0.5rem 0',
                      textAlign: 'center'
                    }}>{name}</h3>
                    
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--para-clr)',
                      opacity: 0.7,
                      margin: '0 0 1rem 0',
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}>{brand}</p>
                    
                    <div className="text-center mb-2">
                      <StarRating rating={averageRating} reviewCount={reviewCount} size="0.9rem" />
                    </div>
                    
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '1rem'
                    }}>
                      {salePrice && salePrice < price ? (
                        <div>
                          <span style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: '#dc3545'
                          }}>
                            <i className="bi bi-currency-rupee"></i>{salePrice}
                          </span>
                          <span style={{
                            fontSize: '1rem',
                            textDecoration: 'line-through',
                            color: '#6c757d',
                            marginLeft: '0.5rem'
                          }}>
                            <i className="bi bi-currency-rupee"></i>{price}
                          </span>
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#28a745',
                            fontWeight: 'bold'
                          }}>
                            {Math.round(((price - salePrice) / price) * 100)}% OFF
                          </div>
                        </div>
                      ) : (
                        <span style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: '#007bff'
                        }}>
                          <i className="bi bi-currency-rupee"></i>{price}
                        </span>
                      )}
                    </div>
                  </Link>
                  
                  <button
                    className={`btn w-100 ${productAvailable ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      borderRadius: '8px',
                      padding: '0.75rem'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (productAvailable) {
                        try {
                          addToCart(product);
                          showNotification && showNotification(`${product.name} added to cart!`, 'success');
                        } catch (error) {
                          console.error('Cart error:', error);
                          showNotification && showNotification('Error adding to cart', 'error');
                        }
                      }
                    }}
                    disabled={!productAvailable}
                  >
                    <i className={`bi ${productAvailable ? 'bi-cart-plus' : 'bi-x-circle'} me-2`}></i>
                    {productAvailable ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// Enhanced animations and effects
const style = document.createElement('style');
style.textContent = `
  @keyframes logoZoomIn {
    0% {
      opacity: 0;
      transform: scale(0.5) perspective(1000px) rotateX(45deg);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1) perspective(1000px) rotateX(10deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) perspective(1000px) rotateX(5deg);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .sp-creative-logo:hover {
    transform: perspective(1000px) rotateX(0deg) scale(1.05) !important;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4) !important;
  }
  
  .btn-light:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 15px 35px rgba(0,0,0,0.3) !important;
    background: linear-gradient(135deg, #ffffff, #f8f9fa) !important;
  }
  
  .hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  }
  
  .product-card {
    transition: all 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
  }
  
  .product-card:hover img {
    transform: scale(1.05);
  }
  
  .btn:hover {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
      gap: 1rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .products-grid {
      grid-template-columns: 1fr !important;
      padding: 1rem !important;
    }
  }
  
  @media (max-width: 768px) {
    .sp-creative-logo {
      width: 120px !important;
      height: 120px !important;
    }
    .display-2 {
      font-size: 2.5rem !important;
    }
    .lead {
      font-size: 1.2rem !important;
    }
    .floating-elements {
      display: none !important;
    }
  }
  
  @media (max-width: 576px) {
    .hero-content {
      padding: 0 1rem !important;
    }
    .sp-creative-logo {
      width: 100px !important;
      height: 100px !important;
    }
  }
`;
if (!document.head.querySelector('style[data-home-styles]')) {
  style.setAttribute('data-home-styles', 'true');
  document.head.appendChild(style);
}

export default Home;