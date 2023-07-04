import React from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as userValidation from "../../validation/userValidation";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../api/apiData";
import { useSelector } from "react-redux";

export default function RecoverPassword() {
  const recoverPasswordSchema = yup.object().shape({
    email: userValidation.email,
  });
  const loader = useSelector((state) => state.loader);
  const navigate = useNavigate();
  const dataSubmit = (obj) => {
    forgetPassword(obj.email).then((data) => {
      if (data?.message) navigate(`/confirmEmail/?email=${obj.email}`);
    });
  };
  return (
    <>
      <main className="vh-100 bg-cover">
        <div className="h-100 bg-cover-shadow d-flex justify-content-center align-items-center">
          <Formik
            validationSchema={recoverPasswordSchema}
            onSubmit={dataSubmit}
            initialValues={{
              email: "",
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
                <h2 className="pt-4">Recover Password</h2>
                <p className="py-3">
                  Enter your email address and we'll send you an email with
                  instructions to reset your password.
                </p>
                <Form.Group className="form-floating  mb-3">
                  <FloatingLabel controlId="email" label="Email Address">
                    <Form.Control
                      type="email"
                      className=" text-light rounded-1 login-input"
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

                <div className="pb-4 pt-3 text-end">
                  <Button type="submit" className="btn btn-danger  py-2">
                    {loader ? "Reset Password" : "Waiting......"}
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
