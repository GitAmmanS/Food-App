// Header.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import "./Header.scss";
import baseUrl from '../baseUrl';
import axios from 'axios';
import logo from '../pics/logo.png'
const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleProduct = (e) => {
    setSearchQuery(e.target.value);
  };
useEffect(()=>{
  let login=localStorage.getItem('login');
  if (!login) {
    navigate('/login');
}
})
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      axios
        .get(`${baseUrl}/category/name?name=${searchQuery}`)
        .then((res) => {
          console.log('Category:', res.data);
          if (res.data.length > 0) {
            navigate(`/SearchCategory/${searchQuery}`);
            setSearchQuery('');
          } else {
            axios.get(`${baseUrl}/product/products/search?name=${searchQuery}`).then((res1) => {
              console.log(res1.data);
              if (res1.data.length > 0) {
                navigate(`/searchproduct/${searchQuery}`);
                setSearchQuery('');
              }
            }).catch((err) => {
              console.log(err);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('login');
    navigate('/login');
};
  return (
    <header>
      <img
        src={logo}
        alt='no Pic'
        onClick={() => {
          navigate('/');
        }}
      />
      <div className='input'>
        <input
          type='search'
          placeholder='Search Product or Category '
          value={searchQuery}
          onChange={handleProduct}
          onKeyDown={handleSearch}
        />
        <CiSearch onClick={handleSearch}  />
      </div>
      <ul className="nav__list">
       
        <li className="nav__item">
          <NavLink to="/report" className="nav__link">
            Report
          </NavLink>
        </li>
        
        <div className="bttn">
      <button 
        onClick={handleLogout} 
      >
        Logout
      </button> 
      </div>
      </ul>
    </header>
  );
};

export default Header;
