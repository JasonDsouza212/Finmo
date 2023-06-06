import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Payoutser = () => {
  const [payoutMethods, setPayoutMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/payout');
        const data = await response.json();
        setPayoutMethods(data.data);
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
    <h1 className="payoutmethh1">Payout Methods</h1>
      {isLoading ? (
        <h1 className='loading-message'>Loading...</h1>
      ) : payoutMethods.length === 0 ? (
        <h1 className='errormsg'>No payout methods available.</h1>
      ) : (
        <div>
          {/* <h1 className="payoutmethh1">Payout Methods</h1> */}
          <div className="payout-container">
            {payoutMethods.map((method) => (
              <div key={method.payout_method_id} className="payout-card">
                <h3 className="payout-title">{method.payout_method_name}</h3>

                <img src={method.payout_method_logo} alt="Logo-payout" className="logo-payout" />
                <p>
                  <span className="payout-key">Sender Country: </span>
                  {method.sender_country}
                </p>
                <p>
                  <span className="payout-key">Sender Currency:</span> {method.sender_currency}
                </p>
                <p>
                  <span className="payout-key">Beneficiary Country:</span> {method.beneficiary_country}
                </p>
                <p>
                  <span className="payout-key">Beneficiary Currency:</span> {method.beneficiary_currency}
                </p>
                <p>
                  <span className="payout-key">Min Amount:</span> {method.min_amount}
                </p>
                <p>
                  <span className="payout-key">Max Amount:</span> {method.max_amount}
                </p>
                <p>
                  <span className="payout-key">Is Returnable:</span> {method.is_returnable ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="payout-key">Is Enabled:</span> {method.is_enabled ? 'Yes' : 'No'}
                </p>
              </div>
            ))}
          </div>
          <div className="payoutbtn">
            <Link to="/payoutser/all" className="payout-link ">
              Payout History
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Payoutser;
