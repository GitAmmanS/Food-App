import React, { useState, useEffect, useRef  } from 'react';
import baseUrl from './baseUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Bill.scss';
import {ReactToPrint} from 'react-to-print';
const Bill = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const componentRef = useRef();
  useEffect(() => {
    axios.get(`${baseUrl}/order/order/search?orderId=${orderId}`)
      .then((res) => {
        setOrder(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, [orderId]);


  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <ReactToPrint
        trigger={() => <button>Print Bill</button>}
        content={() => componentRef.current}
        documentTitle="Order Bill"
        pageStyle="print"
      />

      <div ref={componentRef} className="bill">
        
      <h2>Bill Invoice</h2>
      <p>Madina Autos </p>
      <p>Shop 102 Pirwadhai Rawalpindi </p>
      <p>Contact:03165444681 </p>
      <p>Contact:03205626100 </p>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price (RS)</th>
            <th>Total (RS)</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.productId.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Total Amount</strong></td>
            <td><strong>{order.totalAmount}</strong></td>
          </tr>
        </tbody>
      </table>
      <p>&copy; {new Date().getFullYear()} AS. All rights reserved.</p>
    </div>
    </>
  );
}

export default Bill;
