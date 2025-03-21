import React, { useEffect, useState } from 'react';
import './Product.scss';
import { useNavigate, useParams } from 'react-router-dom';
import baseUrl from '../baseUrl';
import axios from 'axios';
import CartDisplay from '../Cart/CartDisplay';
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Product = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios.get(`${baseUrl}/product/products/search1?categoryId=${categoryId}`)
      .then((res) => {
        if (res.data.length > 0) { 
          setProducts(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryId]);
  const gotoDelete =()=>{
    navigate('/deleteProduct');
  }
  const gotoadd=()=>{
      navigate('/addProduct');
  }
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
    <>
    <div className='main'>
      <div className='product-list'>
        {products.map((product, index) => (
          <div className='product' key={index} onClick={() => addToCart(product._id)}>
            <div className='product-info'>
              <h3>{product.name}</h3>
            </div>
            <div className='product-price'>
              <h3>Price: {product.price} RS</h3>
            </div>
          </div>
        ))}
        <div className="svgs">
          <MdOutlineAddCircleOutline onClick={gotoadd} />
          <AiOutlineDelete onClick={gotoDelete}/>
          </div>
      </div>
      <CartDisplay />
      </div>
    </>
  );
};

export default Product;
