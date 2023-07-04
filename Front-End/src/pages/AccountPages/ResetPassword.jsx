import React from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as userValidation from "../../validation/userValidation";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/apiData";
import { useSelector } from "react-redux";

export default function ResetPassword() {
  const resetPasswordSchema = yup.object().shape({
    password: userValidation.password,
    confirmPassword: userValidation.confirmPassword,
  });
  const { id } = useParams();
  const loader = useSelector((state) => state.loader);

  const navigate = useNavigate();
  const dataSubmit = (obj) => {
    resetPassword(id, obj).then((data) => {
      if (data?.message) navigate("/login");
    });
  };
  return (
    <>
      <main id="reset-pass-section" className="vh-100 bg-cover">
        <div className="h-100 bg-cover-shadow d-flex justify-content-center align-items-center">
          <Formik
            validationSchema={resetPasswordSchema}
            onSubmit={dataSubmit}
            initialValues={{
              password: "",
              confirmPassword: "",
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
                className="col-xl-4 col-lg-6 col-md-8 col-10 mx-auto bg-dark-light text-light p-5 rounded-4"
              >
                <h2 className="py-5">Reset Password</h2>
                <Form.Group className="form-floating  mb-4">
                  <FloatingLabel controlId="newPassword" label="New Password">
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
                <Form.Group className="form-floating  mb-4">
                  <FloatingLabel
                    controlId="confirmPassword"
                    label="Confirm password"
                  >
                    <Form.Control
                      type="password"
                      className="login-input text-light rounded-1"
                      name="confirmPassword"
                      placeholder="Password"
                      autoComplete="true"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.confirmPassword && !errors.confirmPassword
                      }
                      isInvalid={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <div className="pb-5 pt-4 text-end">
                  <Button id="save-new-pass" type="submit" className="btn fw-bold btn-danger py-2">
                    {loader ? "Save Password" : "Waiting......"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
}
