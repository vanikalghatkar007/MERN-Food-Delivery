import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css';
import { StoreCotext } from '../../context/StoreContext';
import axios from "axios";
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url, token} = useContext(StoreCotext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/user-orders",{},{headers:{token}});
        setData(response.data.data);
        console.log("orders",response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index)=>{
            return(
                <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, index)=>{
                            if (index === order.items.length-1) {
                                return item.name+"*"+item.quantity
                            } else{
                                return item.name+"*"+item.quantity+","
                            }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track your order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders
