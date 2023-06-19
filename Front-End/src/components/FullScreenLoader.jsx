import React from "react";
import { Spinner } from "react-bootstrap";

export default function FullScreenLoader() {
  return (
    <>
      <div className="fullscreen-loader">
        <Spinner animation="border" variant="light"  role="status" className="size-loader">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}
