import React, { Suspense } from "react";
import NavBarAdmin from "../components/NavBarAdmin.jsx";
import { Outlet } from "react-router-dom";
import FullScreenLoader from "../components/FullScreenLoader.jsx";
import { AuthGuards } from "../guards/AuthGuards.js";
import { Nav } from "../components/Navbar Components/Nav component/Nav.js";

export default function AdminGaurdRouter() {
  return (
    <>
    <AuthGuards>
    <Suspense fallback={<FullScreenLoader />}>
    <Nav positionStyle={"position-sticky top-0 start-0"} />
      <main className="container-fluid">
        <div className="row ">
          <NavBarAdmin />
          <Outlet />
        </div>
      </main>
      </Suspense>
      </AuthGuards>
    </>
  );
}
