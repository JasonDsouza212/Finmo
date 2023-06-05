const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
      <>
<footer>
      <div className="footer-content">
        <h3>
         {/* <img className="free-logo-footer"  src={freehitlogo} alt="-" /> */}
          <b>FINMO</b>
        </h3>
        <p>
        Finmo is a full stack digital payments platforms
          
        </p>
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy;{year} <b>Jason-Finmo</b>
          <br />
          Maintained by{' '}
          <span className="maintainer">
            <a target="_blank" href="https://github.com/JasonDsouza212">
              Jason Dsouza
            </a>
          </span>
        </p>
        <br />
      </div>
    </footer>
      </>
    );
  };
  
  export default Footer;
