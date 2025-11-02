import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ results, onClose }) => {
  if (!results || results.length === 0) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'var(--card-bg-clr)',
      border: '1px solid #FFD700',
      borderRadius: '8px',
      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)',
      zIndex: 1000,
      maxHeight: '300px',
      overflowY: 'auto'
    }}>
      {results.map((product) => (
        <Link 
          key={product.id} 
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={onClose}
        >
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
            transition: 'background-color 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-search me-2" style={{ color: '#FFD700' }}></i>
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{product.name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{product.brand}</div>
              </div>
              <div className="ms-auto" style={{ color: '#007bff', fontWeight: 'bold' }}>
                ₹{product.price}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;