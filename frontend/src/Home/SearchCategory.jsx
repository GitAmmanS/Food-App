import React, { useEffect ,useState} from 'react'
// import Header from './Header'
import axios from 'axios'
// import Footer from './Footer'
import baseUrl from '../baseUrl'
import {  useNavigate, useParams } from 'react-router-dom'
import { MdOutlineAddCircleOutline } from "react-icons/md";
const SearchCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const navigate=useNavigate();
  const {name}=useParams();
  useEffect(() => {
    axios
      .get(`${baseUrl}/category/name?name=${name}`)
      .then((res) => {
        setCategoryData(res.data); 
      })
      .catch((err) => {
        console.error(err);
      });
  }, [name]);
  const handleClick =(categoryId)=>{
      navigate(`/product/${categoryId}`)
  }
  const gotoadd =()=>{
    navigate('/addCategory')
  }
  return (
    <>
      
      <h1>Food Categories</h1>
      <div className="grid-container">
        {categoryData.map((category, index) => (
          <div className="grid-item" key={index}
          onClick={() => handleClick(category._id)}>
            {category.name}
          </div>
        ))}
        <MdOutlineAddCircleOutline onClick={gotoadd}/>
      </div>
      
    </>
  );
};

export default SearchCategory