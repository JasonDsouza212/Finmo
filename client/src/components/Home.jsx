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
    <h1>
      <Link onClick={handleLogin} >
        Login
      </Link>
    </h1>
  );
};

export default Home;
