import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  return (
    <>
      <section className="col-md-2">
        <article className="navbar navbar-expand-lg">
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
        </article>
        <article
          className="offcanvas-lg offcanvas-start bg-blue"
          id="navbarSupportedContent"
          data-bs-scroll="true"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header text-light">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Alex
            </h5>
            <button
              type="button"
              className="btn-close bg-light"
              data-bs-dismiss="offcanvas"
              data-bs-target="#navbarSupportedContent"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body py-3 ">
            <div
              className="accordion accordion-flush w-100"
              id="accordionFlushExample"
            >
              <div className="accordion-item border-0 py-3">
                <h3
                  className="accordion-header d-flex justify-content-between  collapsed custom-icon h4 cursor"
                  data-bs-toggle="collapse"
                  data-bs-target="#userFlush"
                  aria-controls="userFlush"
                >
                  <span>
                    <i className="fa-solid fa-users pe-3"></i>
                    User
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
                    >
                      <i className="fa-solid fa-user-plus pe-3"></i>Add User
                    </NavLink>
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/userList"
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
                    >
                      <i className="fa-solid fa-user-plus pe-3"></i>Add Movie
                    </NavLink>
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/moviesList"
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
                  <span>
                    <i className="fa-solid fa-shop pe-3"></i> Products
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
                    >
                      <i className="fa-solid fa-user-plus pe-3"></i>Add Product
                    </NavLink>
                    <NavLink
                      className="text-hover text-light text-decoration-none pb-2"
                      to="/productsList"
                    >
                      <i className="fa-regular fa-eye pe-3"></i>Products List
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 py-3">
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

              <div className="accordion-item border-0 py-3">
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
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
