import jwtDecode from "jwt-decode";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { isAdmin } = jwtDecode(localStorage.getItem("token"));
  return (
    <>
      <section className="vh-100 bg-NotFound">
        <div className="h-100 bg-cover-shadow d-flex justify-content-lg-start justify-content-center align-items-center text-light">
          <div className="ps-md-5 ms-md-5 p-md-3 p-5">
            <h3 className="fw-bolder col-lg-8 col-md-10 size-NotFound">
              Uh - Oh , i think you're lost.
            </h3>
            <p className="lead fs-md-4 col-lg-6  col-md-8 col py-4">
              Pack your map, bring all equipments. We are going to turn back
              time, and don't forget to
              <span className="text-danger ps-1">follow the signal</span>
            </p>
            <div className="d-flex  col-lg-4 col-md-6 col-sm-7  col-8">
              <Link
                to={isAdmin ? "/userList" : "/"}
                className="text-uppercase text-decoration-none text-light py-2 px-4 border border-1 rounded-5 bg-hover-NotFound"
              >
                <i className="fa-solid fa-house text-danger pe-2"></i>home
              </Link>
              {!isAdmin && (
                <Link
                  to={process.env.REACT_APP_Dark}
                  className="text-uppercase text-decoration-none text-light ms-auto py-2 px-4 border border-1 rounded-5 bg-hover-NotFound"
                >
                  <i className="fa-solid fa-play text-danger pe-2"></i>dark
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
