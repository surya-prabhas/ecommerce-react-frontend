import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchOrders(userData.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/user/${userId}`);
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h3>Please login to view your orders</h3>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ marginTop: '100px !important' }}>
      <h2 className="mb-4">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center">
          <i className="bi bi-bag-x display-1 text-muted mb-3"></i>
          <h4>No orders found</h4>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-12 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Order #{order.id}</h5>
                    <small className="text-muted">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="text-end">
                    <span className={`badge ${
                      order.status === 'DELIVERED' ? 'bg-success' :
                      order.status === 'SHIPPED' ? 'bg-info' :
                      order.status === 'PROCESSING' ? 'bg-warning' :
                      'bg-secondary'
                    }`}>
                      {order.status}
                    </span>
                    <div className="mt-1">
                      <strong>₹{order.totalAmount}</strong>
                    </div>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="row">
                    {order.orderItems?.map((item) => (
                      <div key={item.id} className="col-md-6 col-lg-4 mb-3">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img 
                              src={item.product?.imageUrl || '/placeholder.jpg'} 
                              alt={item.product?.name}
                              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">{item.product?.name}</h6>
                            <p className="mb-1 text-muted small">{item.product?.brand}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span>Qty: {item.quantity}</span>
                              <span className="fw-bold">₹{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {order.shippingAddress && (
                    <div className="mt-3 pt-3 border-top">
                      <h6>Shipping Address:</h6>
                      <p className="mb-0">{order.shippingAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;