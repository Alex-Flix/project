import React from "react";
import logo from "../assets/images/logo trans2.png";
import { Link } from "react-router-dom";
export default function Footer() {
  const token = localStorage.getItem("token");
  return (
    <footer className="section-p1 mt-5 pb-0">
      <div className="footer-col">
        <div className="info-footer">
          <img className="logo" src={logo} alt="" width="25%" />
          <p>
            <strong>Addess: </strong> 562 Miami,Street 32, Alexandria,Egypt
          </p>
          <p>
            <strong>Phone: </strong> +01 2222 365 /(+91) 01 2345 6789
          </p>
          <p>
            <strong>Email: </strong> Alexx.flixx@gmail.com
          </p>
          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-pinterest"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-col">
        <h4>My Account</h4>
        <Link className={`text-info ${token?"d-none":""}`} to={"/register"} >Register</Link>
        <Link className=" text-info" to={token?"/profile":"/login"} >{token?"Profile":"Sign In"}</Link>
        <Link className=" text-info" to={`/store/cart`}>View Cart</Link>
        <Link className=" text-info" to={`/favorites`}>My Favorites</Link>
        <Link className=" text-info" to={`/user/orders`}>Track My Order</Link>
      </div>

      <div className="copyright">
        <p>© 2023, Alexflex.co</p>
      </div>
    </footer>
  );
}
