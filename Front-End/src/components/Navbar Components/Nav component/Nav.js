import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavAuth } from "../NavAuth  Component/NavAuth";
import logo from "../../../assets/images/logo trans2.png";
import "./nav.css";
export function Nav({ positionStyle }) {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const favoriteMovies = useSelector((state) => state.favorites);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalInCart = useSelector((state)=> state.cart.total);
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const signOut = () => {
     localStorage.removeItem("token");
  };
  useEffect(() => {
    //check if it's a logged in user
    if (localStorage.getItem("token")) setIsLogedIn(true);
    else setIsLogedIn(false);
    //Applying Navbar effect
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    });
  }, []);

  return (
    <nav
      id="home-navbar"
      className={`navbar navbar-expand-lg py-3 ${
        isScrolled ? "scrolled" : ""
      } ${positionStyle} w-100`}
    >
      <div className="container mw-100 px-5 ">
        <Link className="navbar-brand py-1">
          <img src={logo} alt="Alexflix" width="170" height="35" />
        </Link>
        <button
          id="nav-toggler"
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span id="nav-toggler-icon" className="navbar-toggler-icon">
            <i className="fa-solid fa-bars " style={{ fontSize: "28px" }}></i>
          </span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 flex-grow-1">
            <li className="nav-item">
              <NavLink
                onClick={scrollToTop}
                className="nav-link"
                aria-current="page"
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={scrollToTop}
                className="nav-link"
                to={"/movies"}
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={scrollToTop}
                className="nav-link"
                to={"/series"}
              >
                Series
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={scrollToTop} className="nav-link" to={"/anime"}>
                Anime
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={scrollToTop} className="nav-link" to={"/store"}>
                Store
              </NavLink>
            </li>

            <li id="separator" className="nav-item flex-grow-1"></li>
            <li id="lg-bag" className="nav-item position-relative">
              <NavLink className="nav-link" to={"/store/cart"}>
                <i className="fa-solid fa-bag-shopping fs-3x" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                {totalInCart}  
                </span>
              </NavLink>
            </li>

            {/* <li id="lg-bag" className={`nav-item`}></li> */}

            <li className={`nav-item ${isLogedIn ? "d-none" : "d-block"}`}>
              <NavAuth />
            </li>
            <li
              className={`nav-item dropdown ${
                isLogedIn ? "d-block" : "d-none"
              }`}
            >
              <Link
                id="user_icon"
                className="nav-link btn rounded-circle p-2 dropdown-toggle text-start"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user"></i>
              </Link>

              <ul id="user_dropdown" className="dropdown-menu">
                <li>
                  <Link
                    onClick={scrollToTop}
                    className="dropdown-item text-capitalize"
                    to={"/profile"}
                  >
                    profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={scrollToTop}
                    className="dropdown-item text-capitalize"
                    to={"/settings"}
                  >
                    settings
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={scrollToTop}
                    className="dropdown-item text-capitalize"
                    to={"/favorites"}
                  >
                    favorites
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item text-capitalize"
                    to="/login"
                    onClick={signOut}
                  >
                    sign out &nbsp;
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
