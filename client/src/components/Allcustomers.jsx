import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Allcustomers = () => {
  const [allcustomers, setAllcustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/allcustomer');
        const data = await response.json();
        setAllcustomers(data.data);
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
    <>
      <div>
        <h1 className='payin-hist-h1'>All Customers</h1>
        {isLoading ? (
          <h1 className='loading-message'>Loading...</h1>
        ) : allcustomers.length === 0 ? (
          <h1 className='errormsg'>You have no default customers</h1>
        ) : (
          <table className="payin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer ID</th>
                <th>Is Active</th>
                <th>Is Wallet Ready</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {allcustomers.map((item) => (
                <tr key={item.payin_id}>
                  <td>{`${item.individual.first_name} ${item.individual.last_name}`}</td>
                  <td>{item.customer_id}</td>
                  <td>{item.is_active ? 'True' : 'False'}</td>
                  <td>{item.is_wallet_ready ? 'True' : 'False'}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='payinbtn'>
        <Link to="/addcustomer" className="payin-link ">
          ADD CUSTOMER
        </Link>
      </div>
    </>
  );
};

export default Allcustomers;
