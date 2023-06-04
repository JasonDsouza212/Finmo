import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const payinsuccess = useRef(null);
  const payoutsuccess = useRef(null);
  const navigate = useNavigate();

  async function payinlogin() {
    try {
      const response = await fetch('http://localhost:3000/user/authpayin');
      const data = await response.json();
      payinsuccess.current = data;
    } catch (error) {
      payinsuccess.current = false;
    }
  }

  async function payoutlogin() {
    try {
      const response = await fetch('http://localhost:3000/user/authpayout');
      const data = await response.json();
      payoutsuccess.current = data;
    } catch (error) {
      payoutsuccess.current = false;
    }
  }

  const handleLogin = async (ref) => {
    if (ref === payinsuccess) {
      await payinlogin();
    } else {
      await payoutlogin();
    }
    console.log(ref.current)
    if (ref.current === false) {
      alert('You cannot authenticate further UI');
    } else {
      if(ref==payinsuccess){
        navigate('/payinser');
      }else{
        navigate('/payoutser');
      }
    }
  };

  return (
    <h1>
      <Link onClick={() => handleLogin(payinsuccess)}>Payin</Link>
      <Link onClick={() => handleLogin(payoutsuccess)}>Payout</Link>
    </h1>
  );
};

export default Home;
