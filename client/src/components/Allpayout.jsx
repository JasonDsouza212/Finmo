import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Allpayout = () => {
  const [allPayout, setAllPayout] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/payout/all');
        const data = await response.json();
        setAllPayout(data.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set isLoading to false on error as well
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='payout-hist-h1'>Payout Methods</h1>
      {isLoading ? (
        <h1 className='loading-message'>Loading...</h1>
      ) : allPayout.length === 0 ? (
        <h1 className='errormsg'>Nothing to show, no payout transactions</h1>
      ) : (
        allPayout.map((item) => (
          <div key={item.payout_id}>
            <p>Payout ID: {item.payout_id}</p>
            <p>Payout Method Name: {item.payout_method_name}</p>
            <p>Organization ID: {item.org_id}</p>
            <p>Debit Wallet ID: {item.debit_wallet_id}</p>
            <p>Fees Wallet ID: {item.fees_wallet_id}</p>
            <p>Beneficiary Amount: {item.beneficiary_amount}</p>
            <p>Beneficiary Currency: {item.beneficiary_currency}</p>
            <p>Beneficiary Country: {item.beneficiary_country}</p>
            <p>Sender Amount: {item.sender_amount}</p>
            <p>Sender Currency: {item.sender_currency}</p>
            <p>Sender Country: {item.sender_country}</p>
            <p>FX Rate: {item.fx_rate}</p>
            <p>Purpose Code: {item.purpose_code}</p>
            <p>Payout Reference: {item.payout_reference}</p>
            <p>Status: {item.status}</p>
            <p>Payout Type: {item.payout_type}</p>
            <p>Is Paid: {item.is_paid.toString()}</p>
            <p>Is Returned: {item.is_returned.toString()}</p>
            <p>Created At: {item.created_at}</p>
            <p>Updated At: {item.updated_at}</p>
            {/* Add more properties here as needed */}
          </div>
        ))
      )}
    </div>
  );
};

export default Allpayout;
