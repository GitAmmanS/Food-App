import React, { useEffect, useState } from 'react';
import './Product.scss';
import { useParams } from 'react-router-dom';
import baseUrl from '../baseUrl';
import axios from 'axios';
import CartDisplay from '../Cart/CartDisplay';
const SearchedProducts = () => {
  const { name } = useParams();
  const [product, setProduct] = useState([]);
   
    useEffect(() => {
       
              axios.get(`${baseUrl}/product/products/search?name=${name}`)
                .then((res1) => {
                  setProduct(res1.data);
                  console.log(res1.data);
                })
                .catch((err) => {
                  console.log(err);
                });
      }, [ name]);
      const addToCart = (productId) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.includes(productId)) {
          alert("Product is already in the cart");
          return;
        }
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
      };
  return (
    <div className='main'>
    <div className='product-list'>
      {product.map((Products, index) => (
       <div className='product' key={index} onClick={() => addToCart(Products._id)}>
          <div className='product-info'>
            <h3>{Products.name}</h3>
            {/* <p>{Products.description}</p> */}
          </div>
          <div className='product-price'>
            <h3>Price: {Products.price} RS</h3>
          </div>
        </div>
      ))}
    </div>
    <CartDisplay />
    </div>
  );
}

export default SearchedProducts;
