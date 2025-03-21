import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Report from './Report/Report'; 
import Home from './Home/Home';
import Product from './Product/Product'; 
import Header from './Home/Header';
import Footer from './Home/Footer';
import './App.scss';
import SearchedProducts from './Product/SearchedProducts';
import SearchCategory from './Home/SearchCategory';
import ShowSomeTimes from './ShowSomeTimes';
import Bill from './Bill'
import DeleteCategory from './Home/DeleteCategory';
import CartDisplay from './Cart/CartDisplay';
import Protected from './Protected';
import AddCategory from './Home/AddCategory';
import AddProduct from './Product/AddProduct';
import DeleteProduct from './DeleteProduct'
const App = () => {
  return (
    <Router>
      
        <ShowSomeTimes>
          <Header />
        </ShowSomeTimes>
        <Routes>
        <Route path='/login' element={<Login/>}/>
          <Route path="/report" element={<Protected Component={Report}/>}/>
          <Route path='/' element={<Protected Component={Home}/>}/>
          <Route path="/SearchCategory/:name" element={<Protected Component={ SearchCategory }/>}/>
          <Route path="/product/:categoryId" element={<Protected Component={Product}/>}/>
          <Route path="/footer" element={<Protected Component={Footer}/>}/>
          <Route path="/searchproduct/:name" element={<Protected Component={SearchedProducts}/>}/>
          <Route path="/cartdisplay" element={<Protected Component={CartDisplay}/>}/>
          <Route path="/bill/:orderId" element={<Protected Component={Bill}/>}/>
          <Route path="/addCategory" element={<Protected Component={AddCategory}/>}/>
          <Route path="/addProduct" element={<Protected Component={AddProduct}/>}/>
          <Route path="/deleteCategory" element={<Protected Component={DeleteCategory}/>}/>
          <Route path="/deleteProduct" element={<Protected Component={DeleteProduct}/>}/>
        </Routes>
        <ShowSomeTimes>
          
        </ShowSomeTimes>
    </Router>
  );
};

export default App;
