import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Payinser = () => {
    const [payinMethods, setPayinMethods] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/user/payin');
          const data = await response.json();
          setPayinMethods(data.data);
          console.log(data)
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

  return (
 <div>
      <h1>Payin Methods</h1>
      {payinMethods.map((method) => (
        <div key={method.payin_method_id}>
          <h3>{method.payin_method_name}</h3>
          <p>{method.payin_method_description}</p>
          <img src={method.payin_method_logo} alt="Logo" />
          <p>Category: {method.payin_method_category}</p>
          <p>Class: {method.payin_method_class}</p>
          <p>Country: {method.country}</p>
          <p>Currency: {method.currency}</p>
          <p>VA Allowed: {method.is_va_allowed ? 'Yes' : 'No'}</p>
          <p>Payin Allowed: {method.is_payin_allowed ? 'Yes' : 'No'}</p>
          <p>Enabled: {method.is_enabled ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default Payinser;