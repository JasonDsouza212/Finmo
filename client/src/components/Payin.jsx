import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  // const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');
  // const [payinMethodName, setPayinMethodName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payinData = {
      amount: parseInt(amount), // Convert to number using parseInt
      currency:"AUD",
      description,
      payin_method_name: "au_bank_npp",
    };

    try {
      const response = await axios.post('http://localhost:3000/user/payinnow', payinData);
      if (response.statusText=="Created") {
        alert("Payment successful");
        navigate('/');
      } else {
        alert('Payment unsuccessful');
      }
    } catch (error) {
      console.log(error);
      alert('Payment unsuccessful');
    }
  };

  return (
    <div className="payment-form-container">
      <h1 className="form-title">PAYIN FORM</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Amount in AUD:</label>
          <input
            type="number"
            id="amount"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="currency" className="form-label">Currency:</label>
          <input
            type="text"
            id="currency"
            className="form-input"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            type="text"
            id="description"
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="payinMethodName" className="form-label">Payin Method Name:</label>
          <input
            type="text"
            id="payinMethodName"
            className="form-input"
            value={payinMethodName}
            onChange={(e) => setPayinMethodName(e.target.value)}
          />
        </div> */}
        <button type="submit" className="form-button">Pay</button>
      </form>
      {/* <Link to="/payinser/all" className="link">Go to All Payin Services</Link> */}
    </div>
  );
};

export default PaymentForm;
