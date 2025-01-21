import React, { useContext, useEffect } from 'react'
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreCotext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
//Returns a tuple of the current URL's URLSearchParams
// and a function to update them. Setting the search params 
// causes a navigation.
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreCotext);
    const navigate = useNavigate();

    const verifyPayment = async () =>{
        const response = await axios.post(url+"/api/order/verify", {success, orderId});
        if (response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
