import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addcustomer = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country_of_residence, setCountry_of_residence] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payinData = {
      type: "individual",
      individual: {
        first_name: firstname,
        last_name: lastname,
        country_of_residence: country_of_residence
      }
    };

    try {
      const response = await axios.post('http://localhost:3000/user/addcustomer', payinData);
      if (response) {
        alert("Added Customer");
        navigate('/allcustomers');
      } else {
        alert('Error while adding customer');
      }
    } catch (error) {
      console.log(error);
      alert('Error while adding customer');
    }
  };

  return (
    <div className="payment-form-container">
      <h1 className="form-title">PAYIN FORM</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">First Name:</label>
          <input
            type="text"
            id="amount"
            className="form-input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency" className="form-label">Last Name:</label>
          <input
            type="text"
            id="currency"
            className="form-input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Country:</label>
          <input
            type="text"
            id="description"
            className="form-input"
            value={country_of_residence}
            onChange={(e) => setCountry_of_residence(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default Addcustomer;
