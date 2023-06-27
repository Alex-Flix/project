import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { UserGuard } from "../guards/AuthGuards.js";
import FullScreenLoader from "../components/FullScreenLoader.jsx";
import { Nav } from "../components/Navbar Components/Nav component/Nav.js";

export default function UserGaurdRouter() {
  return (
    <>
      <UserGuard>
        <Suspense fallback={<FullScreenLoader />}>
          <Nav positionStyle={"position-sticky top-0 start-0"} />
          <div>
            <Outlet />
          </div>
        </Suspense>
        
      </UserGuard>
    </>
  );
}
