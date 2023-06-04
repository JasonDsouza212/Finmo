import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Service from './components/Service'
import Payinser from './components/Payinser';
import Payoutser from './components/Payoutser';
import './App.css'; // Import app.css file


function App() {
  const [payinMethods, setPayinMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/payin');
        const data = await response.json();
        setPayinMethods(data.data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service/>}/>
        <Route path="/payinser" element={<Payinser/>}/>
        <Route path="/payoutser" element={<Payoutser/>}/>
      </Routes>
    </div>
   
  );
}

export default App;
