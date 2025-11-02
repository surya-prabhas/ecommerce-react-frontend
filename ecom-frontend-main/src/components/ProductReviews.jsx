import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchReviews();
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${productId}/reviews`);
      setReviews(response.data.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.post(`http://localhost:8080/api/products/${productId}/reviews`, {
        ...newReview,
        userId: user.id
      });
      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="mt-4">
      <h5>Customer Reviews</h5>
      
      {user && (
        <div className="card mb-4">
          <div className="card-body">
            <h6>Write a Review</h6>
            <form onSubmit={submitReview}>
              <div className="mb-3">
                <label>Rating:</label>
                <select 
                  className="form-select"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                >
                  {[5,4,3,2,1].map(num => (
                    <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Write your review..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <StarRating rating={review.rating} showCount={false} />
                    <h6 className="mt-2">{review.user?.firstName || 'Anonymous'}</h6>
                  </div>
                  <small className="text-muted">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;