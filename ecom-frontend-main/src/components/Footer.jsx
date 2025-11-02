import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--navbar_background)',
      color: 'var(--navbar_text)',
      padding: '3rem 0 1rem',
      marginTop: '4rem',
      borderTop: '2px solid #FFD700'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #FFD700, #FF69B4, #8A2BE2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px'
              }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'white' }}>SP</span>
              </div>
              <h5 style={{ margin: 0, fontWeight: 'bold' }}>SP ECOM</h5>
            </div>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Your trusted destination for quality products with exceptional service and fast delivery.
            </p>
          </div>
          
          <div className="col-md-2 mb-4">
            <h6 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Home</a></li>
              <li><a href="/products" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Products</a></li>
              <li><a href="/cart" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Cart</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h6 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Categories</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Electronics</li>
              <li style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Fashion</li>
              <li style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Mobile</li>
              <li style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Laptops</li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h6 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Contact Info</h6>
            <div style={{ fontSize: '0.9rem' }}>
              <p><i className="bi bi-envelope me-2"></i>support@specom.com</p>
              <p><i className="bi bi-phone me-2"></i>+91 9876543210</p>
              <div className="mt-3">
                <i className="bi bi-facebook me-3" style={{ fontSize: '1.2rem', cursor: 'pointer' }}></i>
                <i className="bi bi-twitter me-3" style={{ fontSize: '1.2rem', cursor: 'pointer' }}></i>
                <i className="bi bi-instagram me-3" style={{ fontSize: '1.2rem', cursor: 'pointer' }}></i>
              </div>
            </div>
          </div>
        </div>
        
        <hr style={{ borderColor: '#FFD700', opacity: 0.3, margin: '2rem 0 1rem' }} />
        <div className="text-center">
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>
            © 2024 Surya Prabhas E-Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;