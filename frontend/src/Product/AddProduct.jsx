import React, { useState, useEffect } from 'react';
import '../Home/Header.scss';
import baseUrl from '../baseUrl';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [category, setCategory] = useState([]);
//hey
    useEffect(() => {
        axios.get(`${baseUrl}/category/`)
            .then((res) => {
                setCategory(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const add = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/product/products`, { name, description, price, category: selectedCategory })
            .then((res) => {
                console.log(res.data);
                alert("Record Entered Successfully");
                setName('');
                setDescription('');
                setPrice('');
                setSelectedCategory('');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="head">
                <h2>Add Product</h2>
            </div>
            <div className='addCategory'>
                <form onSubmit={add} action="submit">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        placeholder='Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea 
                        type="text"
                        placeholder='Description'
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="price">Price</label>
                    <input 
                        type="number"
                        placeholder='Price'
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {category.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button className='bt' type='submit'>Add+</button>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
