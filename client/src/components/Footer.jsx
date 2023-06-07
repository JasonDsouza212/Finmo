import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer>
        <div className="footer-content">
          <h3>
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
              <Link target="_blank" href="https://github.com/JasonDsouza212">
                Jason Dsouza
              </Link>
            </span>
          </p>
          <br />
        </div>
      </footer>
    </>
  );
};

export default Footer;
