import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

export const AuthGuards = (e) => {
  if (localStorage.getItem("token")) {
    const { isAdmin } = jwtDecode(localStorage.getItem("token"));
    if (isAdmin) return e.children;
    else return <Navigate to="/notFound" />;
  }
  return <Navigate to="/" />;
};

export const UserGuard = (e) => {
  if (localStorage.getItem("token")) {
    const { isAdmin } = jwtDecode(localStorage.getItem("token"));
    if (!isAdmin) return e.children;
    else return <Navigate to="/notFound" />;
  }
  return <Navigate to="/" />;
};

export const LoginGuard = (e) => {
  if (localStorage.getItem("token")) {
    const { isAdmin } = jwtDecode(localStorage.getItem("token"));
    if (isAdmin) return <Navigate to="/userList" />;
    else return <Navigate to="/" />;
  }
  return e.children;
};

export const HomeGuard = (e) => {
  if (localStorage.getItem("token")) {
    const { isAdmin } = jwtDecode(localStorage.getItem("token"));
    if (isAdmin) return <Navigate to="/notFound" />;
    else return e.children;
  }
  return e.children;
};
