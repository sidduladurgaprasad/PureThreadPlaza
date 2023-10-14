import React, { useState, useEffect } from 'react';
import './styles/Cart.css';

const Cart = ({ loggedUser }) => {
  const [userCart, setUserCart] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the user's cart items and product data when loggedUser changes.
    fetch(`http://localhost:4000/get-user?email=${loggedUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        if (userData.message === 'All users' && userData.payload.length === 1) {
          setUserCart(userData.payload[0].cartItems);
        } else {
          console.error('User not found or data format is incorrect.');
        }
      })
      .catch((error) => console.error('Error fetching user data:', error));

    fetch('http://localhost:4000/get-products')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'All bookings') {
          setProducts(data.payload);
        } else {
          console.error('Error in fetching products data.');
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [loggedUser]);

  useEffect(() => {
    // Fetch the product data from the server.
    fetch('http://localhost:4000/get-products')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'All bookings') {
          setProducts(data.payload);
        } else {
          console.error('Error in fetching products data.');
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

 
  
  // Calculate the total price of items in the cart.
  const calculateTotalPrice = () => {
    let total = 0;
    for (const productId in userCart) {
      if (userCart.hasOwnProperty(productId)) {
        const product = products.find((p) => p.pid === parseInt(productId, 10));
        if (product) {
          total += userCart[productId] * product.price;
        }
      }
    }
    return total;
  };

  const updateUserCart = (cart) => {
    // Send a request to update the user's cart on the server.
    fetch(`http://localhost:4000/update-user?email=${loggedUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Cart updated successfully') {
          // Cart was successfully updated on the server.
        } else {
          console.error('Error updating cart on the server.');
        }
      })
      .catch((error) => console.error('Error updating cart:', error));
  };
  const handleQuantityChange = (productId, change) => {
    const updatedCart = { ...userCart };
    updatedCart[productId] += change;
    
    if (updatedCart[productId] < 1) {
      delete updatedCart[productId]; // Remove the product if quantity is zero or less.
    }
    
    // Update the user's cart in the state.
    setUserCart(updatedCart);
  
    // Send a request to update the user's cart on the server.
    updateUserCart(updatedCart);
  };

  const createOrder = () => {
    // Prepare the order data from the user's cart.
    const orderData = {
      email: loggedUser,
    };
  
    // Send a request to convert cart items to orders.
    fetch('http://localhost:4000/convert-cart-to-orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Cart items converted to orders successfully') {
          // Cart items were successfully converted to orders.
          // Clear the user's cart.
          setUserCart({});
          alert('Order placed successfully!');
        } else {
          console.error('Error converting cart items to orders on the server.');
          alert('Error placing the order. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error converting cart items to orders:', error);
        alert('Error placing the order. Please try again.');
      });
  };
  
  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {Object.keys(userCart).length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {Object.keys(userCart).map((productId) => {
            const product = products.find((p) => p.pid === parseInt(productId, 10));
            if (product) {
              return (
                <div key={productId} className="cart-item">
                  <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    <div className="quantity-control">
                      <button className="quantity-button" onClick={() => handleQuantityChange(productId, -1)}>-</button>
                      <p className="product-quantity">{userCart[productId]}</p>
                      <button className="quantity-button" onClick={() => handleQuantityChange(productId, 1)}>+</button>
                    </div>
                    <p className="product-price">Price: {product.price}</p>
                  </div>
                  <div className="product-image">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
          <p className="total-price">Total Price: {calculateTotalPrice()}</p>
          <button className="place-order-button-cart" onClick={createOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;