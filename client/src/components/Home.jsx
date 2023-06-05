import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
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


//   function to allow going to page 

  const handleLogin = async () => {
    await login();
    if(success.current==false){
        alert("You can autenticate the Finmo UI ")
    }else{
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
            <div class="btns-group">
              <Link onClick={handleLogin} class="btn btn-primary">Login</Link>
            </div>
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