import React, { useState } from 'react';
import baseUrl from './baseUrl';
import axios from 'axios';

const DeleteProduct = () => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const deleteProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.delete(`${baseUrl}/product/delete?name=${name}`)
            .then((res) => {
                // console.log(res.data.deletedCount);
                if (res.data.deletedCount===1) {
                    alert("Record Deleted Successfully");
                    setName('');
                } else {
                    alert('Record not Found');
                }
            }).catch((err) => {
                console.log(err);
                alert('An error occurred while deleting the record');
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <div className="head">
                <h2>Delete Product</h2>
            </div>
            <div className='addCategory'>
                <form onSubmit={deleteProduct} action="submit">
                    <label htmlFor="productName">Enter Name to Delete Product</label>
                    <input
                        type="text"
                        id="productName"
                        placeholder='name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className='bt' type='submit' disabled={isLoading}>
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default DeleteProduct;
