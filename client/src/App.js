import React, { useEffect, useState,createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Service from './components/Service'
import Payinser from './components/Payinser';
import Payoutser from './components/Payoutser';
import Allpayins from './components/Allpayins';
import Allpayout from './components/Allpayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Payin from './components/Payin';
import Addcustomer from './components/Addcustomer';
import Allcustomers from './components/Allcustomers';
import Default from './components/Default';
import './styles/App.css'; // Import app.css file
export const FinmoContext = createContext()

function App() {
  const [payinMethods, setPayinMethods] = useState([]);
  const [isLoggedin,setIsLoggedin] =useState(false)

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
  const finmoContextValue = {
    isLoggedin, setIsLoggedin
  }

  return (
    <div>
      <FinmoContext.Provider value={finmoContextValue}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedin && (
            <>
              <Route path="/services" element={<Service />} />
              <Route path="/payinser" element={<Payinser />} />
              <Route path="/payoutser" element={<Payoutser />} />
              <Route path="/payoutser/all" element={<Allpayout />} />
              <Route path="/payinser/all" element={<Allpayins />} />
              <Route path="/payinser/payin" element={<Payin />} />
              <Route path="/addcustomer" element={<Addcustomer />} />
              <Route path="/allcustomers" element={<Allcustomers />} />
            </>
          )}
          <Route path="*" element={<Default />} />
        </Routes>
        <Footer />
      </FinmoContext.Provider>
    </div>
  );
  
}

export default App;
