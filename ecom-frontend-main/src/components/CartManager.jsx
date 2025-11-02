import axios from 'axios';

class CartManager {
  static async addToCart(product, quantity = 1) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      // Add to backend cart
      try {
        await axios.post(`http://localhost:8080/api/cart/add`, {
          userId: user.id,
          productId: product.id,
          quantity: quantity
        });
      } catch (error) {
        console.error('Error adding to backend cart:', error);
      }
    }
    
    // Add to local storage cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }

  static async removeFromCart(productId) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      try {
        await axios.delete(`http://localhost:8080/api/cart/remove/${productId}?userId=${user.id}`);
      } catch (error) {
        console.error('Error removing from backend cart:', error);
      }
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  }

  static async syncCart() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${user.id}`);
      const backendCart = response.data.data || [];
      
      // Sync with local storage
      localStorage.setItem('cart', JSON.stringify(backendCart));
      return backendCart;
    } catch (error) {
      console.error('Error syncing cart:', error);
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  static getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  static getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
}

export default CartManager;