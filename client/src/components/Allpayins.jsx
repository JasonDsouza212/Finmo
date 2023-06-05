import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Allpayins = () => {
  const [allpayin, setAllpayin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/payin/all');
        const data = await response.json();
        setAllpayin(data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
      <h1 className='payin-hist-h1'>Payin History</h1>
      {allpayin.length === 0 ? (
        <h1 className='errormsg-payinhist'>Nothing to show, no payin transactions</h1>
      ) : (
        <table className="payin-table">
          <thead>
            <tr>
              <th>Payin ID</th>
              <th>Payin Method Name</th>
              {/* <th>Payin Method Description</th> */}
              <th>Payin Method Category</th>
              {/* <th>Payin Method Param</th> */}
              {/* <th>Org ID</th> */}
              {/* <th>Credit Wallet ID</th> */}
              {/* <th>Fees Wallet ID</th> */}
              <th>Amount</th>
              <th>Currency</th>
              <th>Description</th>
              <th>Pay Code</th>
              <th>Payin Type</th>
              <th>Status</th>
              <th>Is Paid</th>
            </tr>
          </thead>
          <tbody>
            {allpayin.map((item) => (
              <tr key={item.payin_id}>
                <td>{item.payin_id}</td>
                <td>{item.payin_method_name}</td>
                {/* <td>{item.payin_method_description}</td> */}
                <td>{item.payin_method_category}</td>
                {/* <td>{JSON.stringify(item.payin_method_param)}</td> */}
                {/* <td>{item.org_id}</td> */}
                {/* <td>{item.credit_wallet_id}</td> */}
                {/* <td>{item.fees_wallet_id}</td> */}
                <td>{item.amount}</td>
                <td>{item.currency}</td>
                <td>{item.description}</td>
                <td>{item.pay_code.text}</td>
                <td>{item.payin_type}</td>
                <td>{item.status}</td>
                <td>{item.is_paid.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
     
    </div>
    </>
  );
};

export default Allpayins;
