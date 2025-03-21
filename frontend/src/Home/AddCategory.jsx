import React, { useState } from 'react'
import './Header.scss'
import baseUrl from '../baseUrl';
import axios from 'axios';
const AddCategory = () => {
    const [name,setName]=useState(null);
    const [description,setDescription]=useState(null);
    const addCategory=(e)=>{
        e.preventDefault();

        axios.post(`${baseUrl}/category/`,{name,description})
        .then((res)=>{
            console.log(res.data);
            alert("Record Enter Succesfully")
            setName('');
            setDescription('');
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <>
    <div className="head">
        <h2>Add Category</h2>
    </div>
    <div className='addCategory'>
        <form onSubmit={addCategory} action="submit">
            <label htmlFor="">Name</label>
            <input type="text"
             placeholder='name'
              required
            value={name}
            onChange={(e)=>
                setName(e.target.value)
            }
            />
            <label htmlFor="">Description</label>
            <textarea type="text" 
            placeholder='description'
            required
            value={description}
            onChange={(e)=>
                setDescription(e.target.value)
            }/>
            <button className='bt'type='submit'>Add+</button>
        </form>
    </div>
    </>
  )
}

export default AddCategory