import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as userValidation from "../../validation/userValidation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { confirmation, login } from "../../api/apiData.js";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

export default function Login() {
  const loginSchema = yup.object().shape({
    email: userValidation.email,
    password: userValidation.password,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const loader = useSelector((state) => state.loader);

  const navigate = useNavigate();

  const dataSubmit = (obj) => {
    login(obj).then((data) => {
      if (data?.message) {
        localStorage.setItem("token", data.token);
        const { isAdmin } = jwtDecode(localStorage.getItem("token"));
        if (isAdmin) navigate("/userList");
        else navigate("/");
      }
    });
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      confirmation(searchParams.get("id")).then((data) => {
        if (data?.message) {
          Swal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  }, []);
  return (
    <>
      <main id="login-section-container" className="vh-100 bg-cover">
        <div className="h-100 bg-cover-shadow d-flex justify-content-center align-items-center">
          <Formik
            validationSchema={loginSchema}
            onSubmit={dataSubmit}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="col-xl-4 col-lg-6 col-md-8  col-10 mx-auto bg-dark-light text-light p-5 rounded-4"
              >
                <h2 className="py-5">Login</h2>
                <Form.Group className="form-floating  mb-4">
                  <FloatingLabel controlId="email" label="Email Address">
                    <Form.Control
                      type="email"
                      className="login-input text-light rounded-1"
                      name="email"
                      placeholder=" "
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating  mb-4">
                  <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                      type="password"
                      className="login-input text-light rounded-1"
                      name="password"
                      placeholder="Password "
                      autoComplete="true"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <div className="text-end mb-3">
                  <Link
                    style={{ color: "var(--specialColor)" }}
                    to="/recoverPassword"
                    className=" text-danger text-decoration-none fs-6"
                  >
                    Forgot Password ?
                  </Link>
                </div>
                <div className="pb-4 pt-3 text-center">
                  <Button
                    id="loginBtn"
                    type="submit"
                    className=" fw-bold w-100 py-2"
                  >
                    {loader ? "Login" : "Waiting......"}
                  </Button>
                </div>
                <div className="pb-5 mb-4">
                  <p style={{ color: "var(--textColor)" }} className=" h6">
                    New to AlexFlix?
                    <Link
                      style={{ color: "var(--specialColor)" }}
                      to="/register"
                      className=" text-decoration-none ps-2"
                    >
                      Sign up now.
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
}
