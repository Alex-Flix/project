import React from "react";
import { useSearchParams } from "react-router-dom";

export default function ConfirmEmail() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <main id="confirm-email" className="vh-100 bg-cover">
        <div className="h-100 bg-cover-shadow d-flex justify-content-center align-items-center">
          <section className="col-xl-4 col-lg-6 col-md-8 col-10 mx-auto bg-dark-light text-light p-5 rounded-4">
            <i id="confirm-icon" className="fa-solid fa-envelope-open-text fa-5x text-red pt-4 pb-3"></i>
            <h2 className="pt-3 pb-2">Success!</h2>
            <p className="pb-4">
              A email has been send to
              <span id="emailToConfirm" className="text-red px-2">{searchParams.get("email")}</span> Please check
              for an email from company and click on the included link.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
