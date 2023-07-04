import React from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as userValidation from "../../validation/userValidation";
import { register } from "../../api/apiData.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Register() {
  const registerSchema = yup.object().shape({
    firstName: userValidation.firstName,
    lastName: userValidation.lastName,
    email: userValidation.email,
    password: userValidation.password,
    confirmPassword: userValidation.confirmPassword,
    phone: userValidation.phone,
    gender: userValidation.gender,
    age: userValidation.age,
  });
  const navigate = useNavigate();
  const loader = useSelector((state) => state.loader);

  const dataSubmit = (obj) => {
    register(obj).then((data) => {
      if (data?.message) navigate(`/confirmEmail/?email=${obj.email}`);
    });
  };

  return (
    <>
      <main id="register-section-container" className="vh-100 bg-cover">
        <div className="h-100 bg-cover-shadow d-flex justify-content-center align-items-center">
          <Formik
            validationSchema={registerSchema}
            onSubmit={dataSubmit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
              age: "",
              gender: "",
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
                className="col-xl-4 col-lg-6 col-md-8 col-10 mx-auto bg-dark-light text-light py-4 px-5 rounded-4"
              >
                <h2 className="pt-3 pb-4">Register</h2>
                <Form.Group className="form-floating  mb-2">
                  <FloatingLabel controlId="firstName" label="FirstName">
                    <Form.Control
                      type="text"
                      className="text-light rounded-1 login-input"
                      name="firstName"
                      placeholder=" "
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.firstName && !errors.firstName}
                      isInvalid={touched.firstName && errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating  mb-2">
                  <FloatingLabel controlId="lastName" label="LastName">
                    <Form.Control
                      type="text"
                      className="text-light rounded-1 login-input"
                      name="lastName"
                      placeholder=" "
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lastName && !errors.lastName}
                      isInvalid={touched.lastName && errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating  mb-2">
                  <FloatingLabel controlId="email" label="Email Address">
                    <Form.Control
                      type="email"
                      className="text-light rounded-1 login-input"
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
                <Form.Group className="form-floating  mb-2">
                  <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                      type="password"
                      className="text-light rounded-1 login-input"
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
                <Form.Group className="form-floating  mb-2">
                  <FloatingLabel
                    controlId="confirmPassword"
                    label="Confirm password"
                  >
                    <Form.Control
                      type="password"
                      className="text-light rounded-1 login-input"
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
                <Form.Group className="form-floating  mb-2">
                  <FloatingLabel controlId="phone" label="Phone">
                    <Form.Control
                      type="text"
                      className="text-light rounded-1 login-input"
                      name="phone"
                      placeholder=" "
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.phone && !errors.phone}
                      isInvalid={touched.phone && errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating  mb-2">
                  <FloatingLabel controlId="age" label="Age">
                    <Form.Control
                      type="number"
                      className="text-light rounded-1 login-input"
                      name="age"
                      placeholder=" "
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.age && !errors.age}
                      isInvalid={touched.age && errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.age}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    id="male"
                    label="Male"
                    name="gender"
                    inline
                    value="male"
                    onChange={handleChange}
                    isInvalid={touched.gender && errors.gender}
                  />
                  <Form.Check
                    type="radio"
                    id="female"
                    label="Female"
                    name="gender"
                    inline
                    value="female"
                    onChange={handleChange}
                    isInvalid={touched.gender && errors.gender}
                  />
                </Form.Group>

                <div className="pb-4 pt-3 text-center">
                  <Button id="registerBtn" type="submit" className="w-100 py-2 fw-bold">
                    {loader ? "Register" : "Waiting......"}
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
