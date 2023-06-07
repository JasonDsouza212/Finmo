import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payinData = {
      amount: parseInt(amount),
      currency: "AUD",
      description,
      payin_method_name: "au_bank_npp",
    };

    try {
      const response = await axios.post('http://localhost:3000/user/payinnow', payinData);
      if (response.statusText === "Created") {
        alert("Payment successful");
        navigate('/payinser/all');
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            type="text"
            id="description"
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;
