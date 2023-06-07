import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import Service from './components/Service';
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
import Customerdetails from './components/Customerdetails';
import Individualpayindetails from './components/Individualpayindetails';

export const FinmoContext = createContext();

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    if (localStorage.getItem('finmologin') === null) {
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }
  }

  const finmoContextValue = {
    isLoggedin,
    setIsLoggedin,
    checkLogin,
  };

  return (
    <>
      <div className="main-app">
        <FinmoContext.Provider value={finmoContextValue}>
          <Navbar />
          <div className="mainpage">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime" element={<Default />} />
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
                  <Route
                    path="/customer/:customer_id"
                    element={<Customerdetails />}
                  />
                  <Route
                    path="/payin/:payin_id"
                    element={<Individualpayindetails />}
                  />
                </>
              )}
              <Route path="*" element={<Default />} />
            </Routes>
          </div>
          <Footer />
        </FinmoContext.Provider>
      </div>
    </>
  );
}

export default App;
