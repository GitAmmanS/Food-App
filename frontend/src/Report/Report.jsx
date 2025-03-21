import React, { useEffect, useState, useRef } from 'react';
import "./Report.scss";
import baseUrl from '../baseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const Report = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();
  const componentRef = useRef();

  useEffect(() => {
    axios.get(`${baseUrl}/order/order`).then((res) => {
      console.log(res.data);
      setOrders(res.data);
      setFilteredOrders(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleDate = (order) => {
    const date = order.timestamp;
    const formatDate = date.slice(0, 10);
    return formatDate;
  };

  const filterOrders = (range) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'last3days':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3);
        break;
      case 'lastweek':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'lastmonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'lastyear':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        startDate = null;
    }

    if (startDate) {
      const filtered = orders.filter(order => new Date(order.timestamp) >= startDate);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); 
    }
  };

  const printBill = (orderId) => {
    if (orderId) {
      navigate(`/bill/${orderId}`);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h3>Reports</h3>
        <select name="sort" id="sort" onChange={(e) => filterOrders(e.target.value)}>
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="last3days">Last 3 Days</option>
          <option value="lastweek">Last Week</option>
          <option value="lastmonth">Last Month</option>
          <option value="lastyear">Last Year</option>
        </select>
      </div>
      <table ref={componentRef}>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Order Id</th>
            <th>Total</th>
            <th>Time</th>
            <th className="print-bill-td">Print Bill</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders && filteredOrders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order._id}</td>
              <td>{order.totalAmount}</td>
              <td>{handleDate(order)}</td>
              <td className="print-bill-td"><button onClick={() => printBill(order._id)}>Print Bill</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactToPrint
        trigger={() => <button>Print Record</button>}
        content={() => componentRef.current}
        documentTitle="Order Bill"
        pageStyle="print"
      />
    </div>
  );
}

export default Report;
