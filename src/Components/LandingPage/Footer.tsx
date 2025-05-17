import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const navigate = useNavigate();
    return (
      <div className="footer" ref={ref} {...props}>
        <div className="ftr">
          <div className="ftr1">
            <img src="/assets/icons/Simbi-logo.svg" alt="" />
            <h4>Your AI Study Body</h4>
          </div>
          <div className="ftr-f">
            <div className="ftr">
              <div className="ftr2">
                <h2>Comapny</h2>
                <br />
                <p>Resources</p>
                <p>About Us</p>
                <p>Contact Us</p>
              </div>
              <div className="ftr2">
                <h2>Help</h2>
                <br />
                <p>Terms</p>
                <p>Privacy Policy</p>
                <p>Cookies</p>
              </div>
            </div>
            <div className="ftr-ftr">
              <p>Copyright ©2025 CalmMind. All rights reserved</p>
              <div className="ftr-icons">
                <img src="/assets/icons/insta.svg" alt="" />
                <img src="/assets/icons/facebook.svg" alt=""  className="facebook"/>
                <img src="/assets/icons/proicons_x-twitter.svg" alt="" />
                <img src="/assets/icons/Linkedin.svg" alt="" />
              </div>
            </div>
          </div>

          <div className="ftr-btn">
            <button className="str-btn" onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button className="alr-btn" onClick={() => navigate("/login")}>
              Already have an account
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default Footer;
