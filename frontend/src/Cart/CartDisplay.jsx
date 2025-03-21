import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../baseUrl';
import './CartDisplay.scss';
import { useNavigate } from 'react-router-dom';
const CartDisplay = () => {
  const [products, setProducts] = useState([]);
  const [quantity,setQuantity]=useState([1]);
  const navigate=useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total=0;
useEffect(() => {
    const fetchProducts = async () => {

        if (cart.length === 0) {
            console.log('Cart is empty');
            setProducts([]);
            setQuantity([]);
            return;
        }

        try {
            const productRequests = cart.map(productId =>
                axios.get(`${baseUrl}/product/products/search1?productId=${productId}`)
            );

            const productResponses = await Promise.all(productRequests);

            const productData = productResponses.map(response => response.data);

            const initialQuantities = {};
            cart.forEach(productId => {
                initialQuantities[productId] = JSON.parse(localStorage.getItem(`quantity_${productId}`)) || 1;
            });

            setProducts(productData);
            setQuantity(initialQuantities);

            // console.log('Fetched Product Data:', productData);
        } catch (err) {
            console.error('Error fetching product details:', err);
        }
    };

    fetchProducts();
}, [cart, baseUrl]); 


  const increaseQuanity=(productId)=>{
    setQuantity(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1
    }));
    localStorage.setItem(`quantity_${productId}`, JSON.stringify((quantity[productId] || 0) + 1));
  }
  const decreaseQuantity=(productId)=>{
    setQuantity(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0)
    }));
    localStorage.setItem(`quantity_${productId}`, JSON.stringify(Math.max((quantity[productId] || 0) - 1, 0)));
  }
  const calculateTotal = () => {
    let total = 0;
    products.flat().forEach(product => {
      const qty = quantity[product._id] || 0;
      total += product.price * qty;
    });
    return total;
  };
  const removelocalstorage=(productid)=>{
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
      localStorage.removeItem(`quantity_${productid}`);
      const updatedCart = cart.filter(id => id !== productid);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // localStorage.setItem(`quantity_${productid}`,1);
  }
  const clearCart=()=>{
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.removeItem('cart');
    setProducts([]);
    setQuantity([]);
  }
  const postToOrder = () => {
    const userId = localStorage.getItem('userId');
    // console.log(userId);
    console.log("Products:", products);
  console.log("Quantity:", quantity);

    const items = products.flat().map((product) => ({
      productId: product._id,
      quantity: quantity[product._id],
      price: product.price,
    }));
  
    const orderData = {
      userId: userId,
      items: items,
    };
    // console.log(orderData);
    axios.post(`${baseUrl}/order/orders`, orderData)
      .then((res) => {
       console.log("Order posted:", res.data);
        navigate(`/bill/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className="cart-display">
      <h2>Cart Items</h2>
      {products.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        products.flat().map((product) => (
          <div key={product._id} className="cart-item">
            <h3>{product.name}</h3>
            <div className="quantity-controls">
              <button onClick={()=>decreaseQuantity(product._id)}>-</button>
              <span>{quantity[product._id]}</span>
              <button onClick={()=>increaseQuanity(product._id)}>+</button>
            </div>
            <p>Price: {product.price} RS</p>
            <p>Total: {total=quantity[product._id]?product.price * quantity[product._id]:product.price} RS</p>
            <button onClick={()=>removelocalstorage(product._id)}>Remove</button>
          </div>
        ))
      )}
      <div className="total">Total: {calculateTotal()}RS</div>
      <div className="button-container">
      <div className="print-bill"><button onClick={()=>postToOrder()}>Print Bill</button></div>
      <div className="clear-cart"><button onClick={()=>clearCart()}>Clear Cart</button></div>
    </div>
    </div>
  );
};

export default CartDisplay;
