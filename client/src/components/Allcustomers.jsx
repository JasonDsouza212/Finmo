import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AllCustomers = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/allcustomer');
        const data = await response.json();
        setAllCustomers(data.data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (customerId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/customer/${customerId}`)
      if(response.status===200){
        alert("User deleted successfully")
        navigate('/allcustomers');
      }else{
        alert("there was an error delting the user")
        navigate('/allcustomers');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className='payin-hist-h1'>All Customers</h1>
        {isLoading ? (
          <h1 className='loading-message'>Loading...</h1>
        ) : allCustomers.length === 0 ? (
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allCustomers.map((item) => (
                <tr
                  key={item.payin_id}
                  className='tr-items'
                  onClick={() => navigate(`/customer/${item.customer_id}`)}
                >
                  <td>{`${item.individual.first_name} ${item.individual.last_name}`}</td>
                  <td>{item.customer_id}</td>
                  <td>{item.is_active ? 'True' : 'False'}</td>
                  <td>{item.is_wallet_ready ? 'True' : 'False'}</td>
                  <td>{item.created_at}</td>
                  <td onClick={() => handleDeleteUser(item.customer_id)}>
                    <button
                      className="delete-button"
                    >
                      <i class="ri-delete-bin-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='payinbtn'>
        <Link to="/addcustomer" className="payin-link">
          ADD CUSTOMER
        </Link>
      </div>
    </>
  );
};

export default AllCustomers;
