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
      if(ref===payinsuccess){
        navigate('/payinser');
      }else{
        navigate('/payoutser');
      }
    }
  };

  return (
    <>
    <div className='service-card'>
      <div className="card">
      <h2 className="card-title">PAYIN</h2>
      <p className="card-paragraph">Payin is the basic mechanism for collecting money from customers and depositing it in the Merchant Payin wallet or other Finmo Customer wallets.</p>
      <Link className="card-button" onClick={() => handleLogin(payinsuccess)}>Payin</Link>
    </div>
    <div className="card">
      <h2 className="card-title">PAYOUT</h2>
      <p className="card-paragraph">Payout in Finmo terminology means money to be sent out to your beneficiaries from your Finmo account. Finmo here acts as a remitter of funds .</p>
      <Link className="card-button" onClick={() => handleLogin(payoutsuccess)}>Payout</Link> 
    </div>
      </div>
    </>
    
  );
};

export default Home;
