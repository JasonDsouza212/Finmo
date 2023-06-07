import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Customerdetails() {
  const { customer_id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/customer/${customer_id}`);
        const data = await response.json();
        setCustomer(data.data);
        setIsLoading(false);
        // console.log(customer);
      } catch (error) {
        // console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [customer_id]);

  return (
    <div>
      <h1 className='payin-hist-h1'>Customer Details </h1>
      {isLoading ? (
        <h1 className='loading-message'>Loading...</h1>
      ) : customer === [] ? (
        <h1 className='errormsg'>Sorry no details available for the customer</h1>
      ) : (
        <table className="customer-table">
          <tbody>
            <tr>
              <td className="key">Name</td>
              <td>{customer.individual.first_name} {customer.individual.last_name}</td>
            </tr>
            <tr>
              <td className="key">Email</td>
              <td>{customer.individual.email == null ? "Sorry no Email available" : customer.individual.email} </td>
            </tr>
            <tr>
              <td className="key">DOB</td>
              <td>{customer.individual.dob == null ? "Sorry no DOB available" : customer.individual.dob} </td>
            </tr>
            <tr>
              <td className="key">Customer ID</td>
              <td>{customer.customer_id}</td>
            </tr>
            <tr>
              <td className="key">Type</td>
              <td>{customer.type}</td>
            </tr>
            <tr>
              <td className="key">Is Active</td>
              <td>{customer.is_active ? "Yes" : "NO"}</td>
            </tr>
            <tr>
              <td className="key">Is Wallet ready</td>
              <td>{customer.is_wallet_ready ? "Yes" : "NO"}</td>
            </tr>
            <tr>
              <td className="key">Created BY</td>
              <td>{customer.created_by}</td>
            </tr>
            <tr>
              <td className="key">Created AT</td>
              <td>{customer.created_at}</td>
            </tr>
            <tr>
              <td className="key">Updated AT</td>
              <td>{customer.updated_at}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
