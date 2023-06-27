import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as userValidation from "../../validation/userValidation";
import imgDefault from "../../assets/img/movie-19.jpg";
import { addProfileImgForUser, addUser } from "../../api/apiData";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function AddUser() {
  const loader = useSelector((state) => state.loader);

  const addUserSchema = yup.object().shape({
    firstName: userValidation.firstName,
    lastName: userValidation.lastName,
    email: userValidation.email,
    phone: userValidation.phone,
    gender: userValidation.gender,
    age: userValidation.age,
  });
  const [img, setImg] = useState(null);

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  const dataSubmit = (obj, { resetForm }) => {
    addUser(obj).then((data) => {
      if (data?.message) {
        if (img) {
          const formData = new FormData();
          formData.append("img", img);
          formData.append("_id", data.data._id);
          addProfileImgForUser(formData).then((data) => {
            if (data?.message) {
              Swal.fire({
                icon: "success",
                title: data.message,
              });
              resetForm();
              setImg(null);
            }
          });
        } else {
          Swal.fire({
            icon: "success",
            title: data.message,
          });
          resetForm();
        }
      }
    });
  };
  return (
    <>
      <section className="col-xl-10 py-5 text-light offset-xl-2">
        <h2 className="pt-xl-0 pt-3 pb-2 ms-lg-5">Add User</h2>
        <section className="row">
          <article className="col-lg-3 col-md-4 col-10  mx-auto">
            <div className="position-relative">
              <img
                src={img ? URL.createObjectURL(img) : imgDefault}
                alt="Profile"
                className="w-100 rounded-3 shadow-sm "
              />
              <Form.Group
                controlId="formFile"
                className="position-absolute top-50 start-50 translate-middle w-100 h-100 i-hover"
              >
                <Form.Label className="w-100 h-100  d-flex justify-content-center align-items-center cursor">
                  <i className="fa-solid fa-camera-retro fa-5x text-white i-hide"></i>
                </Form.Label>
                <Form.Control
                  type="file"
                  className="d-none"
                  onChange={handleImg}
                />
              </Form.Group>
            </div>
          </article>
          <Formik
            validationSchema={addUserSchema}
            onSubmit={dataSubmit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              age: "",
              gender: "",
              isAdmin: false,
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
                className="col-lg-6 col-md-7 col-10   mx-auto  pt-md-0 pt-3  "
              >
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control
                    type="text"
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control
                    type="text"
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
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
                  <Form.Check
                    type="switch"
                    id="admin"
                    label="Admin"
                    name="isAdmin"
                    inline
                    value={values.isAdmin}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="py-3">
                  <Button type="submit" className="btn-primary">
                    {loader ? "Add" : "Waiting......"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </section>
    </>
  );
}
