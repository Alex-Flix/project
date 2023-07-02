import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo trans2.png";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  const dismissOffcanvas = () => {
    const offcanvas = document.querySelector("#admin-navBar");
    const backdrop = document.querySelector(".offcanvas-backdrop");
    const position = document.querySelector("#navBarAdmin");

    if (offcanvas && backdrop && position) {
      offcanvas.classList.remove("show");
      backdrop.classList.remove("show");
      position.classList.add("position-fixed");
    }
    window.scrollTo(0, 0);
  };
  const signOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };
  const showOffcanvas = () => {
    const offcanvas = document.querySelector("#navBarAdmin");
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (offcanvas && backdrop) {
      offcanvas.classList.toggle("position-fixed");
      backdrop.addEventListener("click", () => {
        offcanvas.classList.add("position-fixed");
      });
    }
  };

  return (
    <>
      <section
        className="col-xl-2 position-fixed top-0 start-0"
        id="navBarAdmin"
      >
        <article className="navbar navbar-expand-xl">
          <button
            id="nav-toggler"
            className="navbar-toggler "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#admin-navBar"
            aria-controls="admin-navBar"
            onClick={showOffcanvas}
          >
            <span id="nav-toggler-icon" className="navbar-toggler-icon">
              <i
                className="fa-solid fa-bars-staggered"
                style={{ fontSize: "28px" }}
              ></i>
            </span>
          </button>
        </article>
        <article
          className="offcanvas-xl offcanvas-start bg-blue"
          id="admin-navBar"
          data-bs-scroll="true"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header text-light">
            <Link
              className="navbar-brand py-1"
              to="/userList"
              onClick={dismissOffcanvas}
            >
              <img src={logo} alt="Alexflix" width="170" height="35" />
            </Link>
            <button
              type="button"
              className="btn-close bg-light"
              data-bs-dismiss="offcanvas"
              data-bs-target="#admin-navBar"
              aria-label="Close"
              onClick={showOffcanvas}
            ></button>
          </div>
          <div className="offcanvas-body py-3 ">
            <div
              className="accordion accordion-flush w-100 "
              id="accordionFlushExample"
            >
              <div
                id="accordion-logo"
                className="accordion-item border-0 pb-4 d-none d-xl-block "
                onClick={dismissOffcanvas}
              >
                <h3
                  className="accordion-header   collapsed  h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#logoFlush"
                  aria-controls="logoFlush"
                  onClick={() => navigate("/userList")}
                >
                  <Link className="navbar-brand py-1">
                    <img src={logo} alt="Alexflix" width="170" height="35" />
                  </Link>
                </h3>
                <div
                  id="logoFlush"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                ></div>
              </div>
              <div className="accordion-item border-0 py-3">
                <h3
                  className="accordion-header d-flex justify-content-between  collapsed custom-icon h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#userFlush"
                  aria-controls="userFlush"
                >
                  <span>
                    <i className="fa-solid fa-users pe-3"></i>
                    Users
                  </span>
                </h3>

                <div
                  id="userFlush"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body d-flex flex-column ">
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/addUser"
                      onClick={dismissOffcanvas}
                    >
                      <i className="fa-solid fa-user-plus pe-3"></i>Add User
                    </NavLink>
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/userList"
                      onClick={dismissOffcanvas}
                    >
                      <i className="fa-regular fa-eye pe-3"></i>User List
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 py-3">
                <h3
                  className="accordion-header d-flex justify-content-between  collapsed custom-icon h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#moviesFlush"
                  aria-controls="moviesFlush"
                >
                  <span>
                    <i className="fa-solid fa-film pe-3"></i>
                    Movies
                  </span>
                </h3>
                <div
                  id="moviesFlush"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body d-flex flex-column">
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/addMovie"
                      onClick={dismissOffcanvas}
                    >
                      <i className="fa-solid fa-user-plus pe-3"></i>Add Movie
                    </NavLink>
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/moviesList"
                      onClick={dismissOffcanvas}
                    >
                      <i className="fa-regular fa-eye pe-3"></i>Movies List
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 py-3">
                <h3
                  className="accordion-header d-flex justify-content-between  collapsed custom-icon h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#productFlush"
                  aria-controls="productFlush"
                >
                  <span className="d-flex flex-nowrap">
                    <i className="fa-solid fa-shop pe-3"></i>
                    Products
                  </span>
                </h3>
                <div
                  id="productFlush"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body d-flex flex-column">
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/addProduct"
                      onClick={dismissOffcanvas}
                    >
                      <i className="fa-solid fa-user-plus pe-3"></i>Add Product
                    </NavLink>
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/productsList"
                      onClick={dismissOffcanvas}
                    >
                      <i className="fa-regular fa-eye pe-3"></i>Products List
                    </NavLink>
                  </div>
                </div>
              </div>

              <div
                className="accordion-item border-0 py-3"
                onClick={dismissOffcanvas}
              >
                <h3
                  className="accordion-header   collapsed  h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#reviewFlush"
                  aria-controls="reviewFlush"
                  onClick={() => navigate("/reviewsList")}
                >
                  <i className="fa-regular fa-comments pe-3"></i>
                  Reviews
                </h3>
                <div
                  id="reviewFlush"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                ></div>
              </div>

              <div
                className="accordion-item border-0 py-3"
                onClick={dismissOffcanvas}
              >
                <h3
                  className="accordion-header   collapsed  h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#orderFlush"
                  aria-controls="orderFlush"
                  onClick={() => navigate("/ordersList")}
                >
                  <i className="fa-solid fa-bag-shopping pe-3"></i>
                  Orders
                </h3>
                <div
                  id="orderFlush"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                ></div>
              </div>

              <div className=" accordion-item">
                <hr className="dropdown-divider" />
              </div>

              <div className="accordion-item border-0 py-3">
                <h3
                  className="accordion-header   collapsed  h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#signOutFlush"
                  aria-controls="signOutFlush"
                  onClick={signOut}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  &nbsp; sign out
                </h3>
                <div
                  id="signOutFlush"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                ></div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
