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
        setIsLoading(false); 
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className='payin-hist-h1'>Payout Methods</h1>
      {isLoading ? (
        <h1 className='loading-message'>Loading...</h1>
      ) : payoutMethods.length === 0 ? (
        <h1 className='errormsg'>No payout methods available.</h1>
      ) : (
        <div>
          <div className="payin-container">
            {payoutMethods.map((method) => (
              <div key={method.payout_method_id} className="payin-card">
                <h3 className="payin-title">{method.payout_method_name}</h3>

                <img src={method.payout_method_logo} alt="Logo-payout" className="logo-payin" />
                <p>
                  <span className="payin-key">Sender Country: </span>
                  {method.sender_country}
                </p>
                <p>
                  <span className="payin-key">Sender Currency:</span> {method.sender_currency}
                </p>
                <p>
                  <span className="payin-key">Beneficiary Country:</span> {method.beneficiary_country}
                </p>
                <p>
                  <span className="payin-key">Beneficiary Currency:</span> {method.beneficiary_currency}
                </p>
                <p>
                  <span className="payin-key">Min Amount:</span> {method.min_amount}
                </p>
                <p>
                  <span className="payin-key">Max Amount:</span> {method.max_amount}
                </p>
                <p>
                  <span className="payin-key">Is Returnable:</span> {method.is_returnable ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="payin-key">Is Enabled:</span> {method.is_enabled ? 'Yes' : 'No'}
                </p>
              </div>
            ))}
          </div>
          <div className="payinbtn">
            <Link to="/payoutser/all" className="payin-link ">
              Payout History
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Payoutser;
