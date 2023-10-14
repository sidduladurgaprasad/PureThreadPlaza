import React, { useState, useEffect } from 'react';
import './styles/Orders.css';

const Orders = ({ loggedUser }) => {
  const [userOrders, setUserOrders] = useState({});
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
          setUserOrders(userData.payload[0].orders);
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

  return (
    <div className="cart-container">
      <h2 className="cart-title">Order History</h2>
      {Object.keys(userOrders).length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {Object.keys(userOrders).map((productId) => {
            const product = products.find((p) => p.pid === parseInt(productId, 10));
            if (product) {
              return (
                <div key={productId} className="cart-item">
                  <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    <p className="product-quantity">{userOrders[productId]}</p>
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
          {/* <p className="total-price">Total Price: ${calculateTotalPrice()}</p>
          <button className="place-order-button-cart">Place Order</button> */}
        </div>
      )}
    </div>
  );
};


export default Orders;
