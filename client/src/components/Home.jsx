import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinmoContext } from '../App';
import axios from 'axios';

const Home = () => {
  const [accessKey, SetAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const { isLoggedin, checkLogin } = useContext(FinmoContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payinData = {
      accessKey: accessKey,
      secretKey: secretKey
    };

    try {
      const response = await axios.post('http://localhost:3000/user/loginwithcred', payinData);
      if (response.data === true) {
        localStorage.setItem("finmologin", "true");
        checkLogin();
        alert("Login successful");
        navigate('/services');
      } else {
        alert('Login unsuccessful');
      }
    } catch (error) {
      console.log(error);
      alert('Login unsuccessful');
    }
  };

  return (
    <>
      <div className="dont_display_on_smaller_screen">
        <h1>
          <p>Website currently works only on Desktop view</p>
        </h1>
      </div>
      <section className="landing" id="welcome-section">
        <div className="container">
          <div className="text">
            <h1 className="landing-h1">welcome to Finmo</h1>
            <span className="landing-span">A modern plug & play, API-driven treasury OS</span>
            <p className="landing-p">Finmo offers you a quick way to start selling online via local payment methods, disburse funds to your suppliers or facilitate global trade between buyers and sellers.Finmo provides on-demand reporting and settlement capabilities to help you make data backed decisions.</p>
            {isLoggedin === false && (
              <div className="payment-form-container login-form">
                <form className="form login-f" onSubmit={handleSubmit}>
                  <h1 className="form-title">LOGIN FORM</h1>
                  <div className="form-group">
                    <label htmlFor="amount" className="form-label">AccessKey:</label>
                    <input
                      type="text"
                      id="accessKey"
                      className="form-input"
                      value={accessKey}
                      onChange={(e) => SetAccessKey(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="currency" className="form-label">SecretKey:</label>
                    <input
                      type="text"
                      id="secretKey"
                      className="form-input"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="form-button">Login</button>
                </form>
              </div>
            )}
          </div>
          <div className="image">
            <img src="https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg" alt="Coding Illsturation" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
