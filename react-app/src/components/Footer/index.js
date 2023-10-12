import "./Footer.css";
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; NotIKEA 2023</p>
      </div>
      <div className="socials-container">
        Contact the Developer
        <div className="socials">
          <NavLink to={{ pathname: 'https://github.com/Maria-R01'}} target="_blank">
            <i class="fa-brands fa-github fa-xl"></i>
          </NavLink>
          <NavLink to={{ pathname: 'https://www.linkedin.com/in/maria-ramirez-00b61b1b5/'}} target="_blank">
          <i class="fa-brands fa-linkedin fa-xl"></i>
          </NavLink>
        </div>
      </div>
      <div className="languages">
        <i class="fa-brands fa-react fa-xl"></i>
        <span>Redux</span>
        <i class="fa-brands fa-square-js fa-xl"></i>
        <span>Flask</span>
        <i class="fa-brands fa-css3-alt fa-xl"></i>
        <span>SQL</span>
        <i class="fa-brands fa-python fa-xl"></i>
        <i class="fa-brands fa-html5 fa-xl"></i>
      </div>
    </footer>
  );
};

export default Footer;
