import React from 'react';

const StarRating = ({ rating, reviewCount, size = '1rem', showCount = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="d-flex align-items-center">
      <div className="stars me-2">
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="bi bi-star-fill" style={{ color: '#FFD700', fontSize: size }}></i>
        ))}
        {hasHalfStar && (
          <i className="bi bi-star-half" style={{ color: '#FFD700', fontSize: size }}></i>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={i} className="bi bi-star" style={{ color: '#ddd', fontSize: size }}></i>
        ))}
      </div>
      {showCount && (
        <span style={{ fontSize: '0.85rem', color: 'var(--para-clr)', opacity: 0.7 }}>
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
};

export default StarRating;