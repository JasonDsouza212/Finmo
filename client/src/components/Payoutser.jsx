import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Payoutser = () => {
    const [payoutMethods, setPayoutMethods] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/user/payout');
          const data = await response.json();
          setPayoutMethods(data.data);
          console.log(data)
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>
      {payoutMethods.map((method) => (
        <div key={method.payout_method_id}>
          <h3>{method.payout_method_name}</h3>
          <p>{method.payout_method_description}</p>
          <img src={method.payout_method_logo} alt="Logo" />
          <p>Sender Country: {method.sender_country}</p>
          <p>Sender Currency: {method.sender_currency}</p>
          <p>Beneficiary Country: {method.beneficiary_country}</p>
          <p>Beneficiary Currency: {method.beneficiary_currency}</p>
          <p>Payout Method Category: {method.payout_method_category}</p>
          <p>Payout Method Class: {method.payout_method_class}</p>
          <p>Payout Method Group: {method.payout_method_group}</p>
          <p>Min Amount: {method.min_amount}</p>
          <p>Max Amount: {method.max_amount}</p>
          <p>Is Returnable: {method.is_returnable ? 'Yes' : 'No'}</p>
          <p>Is Enabled: {method.is_enabled ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default Payoutser;