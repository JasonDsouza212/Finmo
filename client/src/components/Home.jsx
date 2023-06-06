import React, { useState, useEffect, useRef,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FinmoContext } from '../App'
import axios from 'axios';

const Home = () => {
  const [accessKey, SetAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const { isLoggedin, setIsLoggedin } = useContext(FinmoContext)
  const success =useRef(null)
  const navigate = useNavigate();

//   Login function 
  async function login() {
    try {
      const response = await fetch('http://localhost:3000/user/login');
      const data = await response.json();
      
      success.current=data
    } catch (error) {
      success.current=false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payinData = {
      accessKey:accessKey,
      secretKey: secretKey
    };
    
    try {
      const response = await axios.post('http://localhost:3000/user/loginwithcred', payinData);
      // Check if the payment was successful
      if (response.data === true) { // or response.status === 200
        setIsLoggedin(true);
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


//   function to allow going to page 

  const handleLogin = async () => {
    await login();
    if(success.current==false){
        alert("You cant autenticate the Finmo UI ")
    }else{
      alert("Login Syccessful ")
        navigate('/services')
    }
  };

  return (
    <>
      <section class="landing" id="welcome-section">
        <div class="container">
          <div class="text">
            <h1 className='landing-h1'>welcome to Finmo</h1>
            <span className='landing-span'>A modern plug & play, API-driven treasury OS</span>
            <p className='landing-p'>Finmo offers you a quick way to start selling online via local payment methods, disburse funds to your suppliers or facilitate global trade between buyers and sellers.Finmo provides on-demand reporting and settlement capabilities to help you make data backed decisions.</p>
            {isLoggedin ? (
                   null
              ) : <div className="payment-form-container login-form">
              <h1 className="form-title">LOGIN</h1>
              <form className="form" onSubmit={handleSubmit}>
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
              {/* <Link to="/payinser/all" className="link">Go to All Payin Services</Link> */}
            </div>}
            
  
          </div>
          <div class="image">
            <img src="https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg" alt="Coding Illsturation" />
          </div>
        </div>
      </section>


    </>

  );
};

export default Home;
{/* <div className='btncot'>
<h1>
  <Link onClick={handleLogin} >
    Login
  </Link>
  </h1>
  <h1>
  <Link onClick={handleLogin} >
    PayIn
  </Link>
  </h1>
</div> */}