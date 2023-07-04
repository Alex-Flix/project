import {  NavLink } from "react-router-dom";
import "./NavAuth.css";
export function NavAuth() {
  return (
    <div id="nav-auth" className=" d-flex align-items-center">
      <NavLink to={"/login"} className={"mx-1 nav-link"}>Login</NavLink>|<NavLink to={"/register"} className={"mx-1 nav-link"}>Register</NavLink>
    </div>
  );
}
