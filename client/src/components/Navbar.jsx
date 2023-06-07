import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { FinmoContext } from '../App';

const Navbar = () => {
  const { isLoggedin, checkLogin } = useContext(FinmoContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:3000/user/logout');
      if (response) {
        alert("Logged out successfully");
        localStorage.removeItem("finmologin");
        checkLogin();
        navigate('/');
      } else {
        alert("Logout unsuccessful");
      }
    } catch (error) {
      alert("Logout unsuccessful");
    }
  }

  return (
    <>
      <nav class="navbar" id="navbar">
        <div class="container">
          <Link to="/" class="logo">
            <img src="https://c.smartrecruiters.com/sr-company-logo-prod-aws-dc5/61d6633f615ce04be5b02331/huge?r=s3-eu-central-1&_1641440424112" alt="Huddle" class="logo" />
          </Link>
          <div class="nav-links">
            <Link to="/" class="fill">home</Link>
            {isLoggedin ? (
              <>
                <Link to="/services" className="fill">Services</Link>
                <Link to="/payinser/payin" className="fill">payin</Link>
                <Link className="fill" onClick={handleLogout}>Logout</Link>
              </>
            ) : null}
            <div class="toggle-menu scale-effect">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div class="toggle-menu scale-effect">
            <i class="fas fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
