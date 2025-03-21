import React, { useEffect ,useState} from 'react'
// import Header from './Header'
import axios from 'axios'
import Footer from './Footer'
import baseUrl from '../baseUrl'
import {  useNavigate } from 'react-router-dom'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
const Home = () => {
  const [categoryData, setCategoryData] = useState([]);
  const navigate=useNavigate();
  const gotoDelete =()=>{
    navigate('/deleteCategory');
  }
  useEffect(() => {
    axios
      .get(`${baseUrl}/category/`)
      .then((res) => {
        setCategoryData(res.data); 
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);
  const handleClick =(categoryId)=>{
      navigate(`/product/${categoryId}`)
  }
  const gotoadd =()=>{
    navigate('/addCategory')
  }
  return (
      <div className="home">
      <h1>Categories</h1>
      <div className="grid-container">
        {categoryData.map((category, index) => (
          <div className="grid-item" key={index}
          onClick={() => handleClick(category._id)}>
            {category.name}
          </div>
        ))}
         <div className="svgs">
        <MdOutlineAddCircleOutline onClick={gotoadd} />
        <AiOutlineDelete onClick={gotoDelete}/>
        </div>
      </div>
      <Footer/>
      </div>
    
  );
};

export default Home