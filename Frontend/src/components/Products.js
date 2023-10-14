import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/Products.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Products = ({ loggedUser }) => {
  const [products, setProducts] = useState([]);
  
  const { category } = useParams();
  const [selectedFilter, setSelectedFilter] = useState(''); // Store the selected filter type
  const [selectedSort, setSelectedSort] = useState('priceLowToHigh'); // Default sorting: low to high

  // Define the available types for each category
  const typesByCategory = {
    "Men's Wear": ["T-Shirts", "Shirts", "Shorts", "Pants"],
    "Women's Wear": ["Sarees", "Tops", "Chudidars", "Pants"],
    "Kid's Wear": ["Frocks", "Suits", "Boys Party Wear", "Girls Party Wear"],
  };

  useEffect(() => {
    // Fetch and set the products data
    fetch('http://localhost:4000/get-products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.payload);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Filter products based on the selected filter type or category
  const filteredProducts = selectedFilter
    ? products.filter((product) => product.category === category && product.type === selectedFilter)
    : products.filter((product) => product.category === category);

  // Sort products based on the selected sorting option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (selectedSort === 'priceHighToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  // Handle filter and sorting changes
  const handleFilterChange = (filterType) => {
    setSelectedFilter(filterType);
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // Get the available types for the selected category
  const availableTypes = typesByCategory[category] || [];

  // Function to add a product to the user's cart
  // Function to add a product to the user's cart
  const handleAddToCart = (product) => {
    if (loggedUser) {
      // Send a request to the server to fetch the user by email
      fetch(`http://localhost:4000/get-user?email=${loggedUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          const user = userData.payload[0]; // Assuming the email is unique
          if (user) {
            // Update the user's cartItems
            const updatedCartItems = {
              ...user.cartItems,
              [product.pid]: (user.cartItems[product.pid] || 0) + 1,
            };

            // Send a request to update the user's cart
            fetch(`http://localhost:4000/update-user/${user._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ cartItems: updatedCartItems }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.message === 'User updated successfully') {
                  alert(`Added ${product.name} to your cart.`);
                } else {
                  alert('Failed to add the product to your cart. Please try again.');
                }
              })
              .catch((error) => console.error('Error updating the cart:', error));
          } else {
            alert('User not found. Please log in to add items to your cart.');
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      alert('Please log in to add items to your cart.');
    }
  };

  const handlePlaceOrder = (product) => {
    if (loggedUser) {
      // Send a request to the server to fetch the user by email
      fetch(`http://localhost:4000/get-user?email=${loggedUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          const user = userData.payload[0]; // Assuming the email is unique
          if (user) {
            // Update the user's cartItems
            const updatedOrders = {
              ...user.orders,
              [product.pid]: (user.orders[product.pid] || 0) + 1,
            };

            // Send a request to update the user's cart
            fetch(`http://localhost:4000/update-user/${user._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orders: updatedOrders }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.message === 'User updated successfully') {
                  alert(`Added ${product.name} to your cart.`);
                } else {
                  alert('Failed to add the product to your cart. Please try again.');
                }
              })
              .catch((error) => console.error('Error updating the cart:', error));
          } else {
            alert('User not found. Please log in to plcae orders.');
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      alert('Please log in to place orders.');
    }
  };
  
  

  return (
    <div>
      <h2 className="category-title">{category} Products</h2>
      <div className="filter-sort-container">
        {/* Filter options based on product types */}
        <select className="select-filter" value={selectedFilter} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="">All Types</option>
          {availableTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Sorting options based on price */}
        <select className="select-sort" value={selectedSort} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Render the product list based on filtering and sorting */}
      <div className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div key={product.pid} className="product-item">
              <div className="card">
                {/* Product details */}
                <img src={product.img} alt={product.name} />
                <h4>{product.name}</h4>
                <p>Price: {product.price}</p>
                <p>{product.desc}</p>

                {/* Add to Cart and Place Order buttons */}
                <div className="action-icons">
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                  </button>
                  <button className="place-order-button" onClick={() => handlePlaceOrder(product)}>
                    <FontAwesomeIcon icon={faCheckCircle} /> Place Order
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for the selected category, type, and filters.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
