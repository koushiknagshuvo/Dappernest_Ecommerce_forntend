/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="Footer my-3 mt-5 container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4">
            <img className=" w-50 " src="./images/logo.png" alt="" srcset="" />
            <p className=" ms-3 mt-2">
              Dappernest: Your fashion destination for trendy clothes. From
              casual wear to formal attire, we curate a diverse collection to
              suit every style. Explore our latest fashion trends and timeless
              classics. Shop with confidence and express your unique style with
              Dappernest.
            </p>
          </div>
          <div className="Footer_link1 col-12 col-md-4 col-lg-4 d-flex flex-column justify-content-center ">
            <NavLink to="/about">About-Us</NavLink>
            <NavLink to="/privacy-policy">Privacy-Policy</NavLink>
          </div>
          <div className="Footer_Social_icon col-12 col-md-4 col-lg-4 ">
            {/* Shop By category */}
            <div className="Subscribe_container">
              <div className="Shop_By_category ">
                <h4 className="">Join The Dappernest Get 10% Off</h4>
                <input
                  type="text"
                  name="Subscribe"
                  id="Subscribe"
                  placeholder="Please Enter Your Email"
                />
                <button onClick={handleSubscribe}>Subscribe Now</button>
              </div>
            </div>

            {/* Shop By category */}
            <a href="#">
              <i class="bx bxl-facebook-circle"></i>
            </a>
            <a href="#">
              <i class="bx bxl-instagram-alt"></i>
            </a>
            <a href="#">
              <i class="bx bxl-linkedin"></i>
            </a>
            <a href="#">
              <i class="bx bxl-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <div>
        <p className="footer_copyrite text-center">
          All Right Reserved &copy; Dappernest
        </p>
      </div>
    </>
  );
};

export default Footer;
