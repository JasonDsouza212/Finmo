import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Payinser = () => {
  const [payinMethods, setPayinMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/payin');
        const data = await response.json();
        setPayinMethods(data.data);
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
      {isLoading ? (
        <h1 className="loading-message">Loading...</h1>
      ) : (
        <>
          {payinMethods.length === 0 ? (
            <h1 className="errormsg-payin">No payin methods available</h1>
          ) : (
            <>
              <h1 className="payinmethh1">Payin Methods</h1>
              <div className="payin-container">
                {payinMethods.map((method) => (
                  <div key={method.payin_method_id} className="payin-card">
                    <h3 className="payin-title">{method.payin_method_name}</h3>
                    <img src={method.payin_method_logo} alt="Logo-payin" className="Logo-payin" />
                    <p>
                      <span className="payin-key">Category:</span> {method.payin_method_category}
                    </p>
                    <p>
                      <span className="payin-key">Class:</span> {method.payin_method_class}
                    </p>
                    <p>
                      <span className="payin-key">Country:</span> {method.country}
                    </p>
                    <p>
                      <span className="payin-key">Currency:</span> {method.currency}
                    </p>
                    <p>
                      <span className="payin-key">VA Allowed:</span> {method.is_va_allowed ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <span className="payin-key">Payin Allowed:</span> {method.is_payin_allowed ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <span className="payin-key">Enabled:</span> {method.is_enabled ? 'Yes' : 'No'}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <div className="payinbtn">
        <Link to="/payinser/all" className="payin-link">
          Payin History
        </Link>
      </div>
    </>
  );
};

export default Payinser;
