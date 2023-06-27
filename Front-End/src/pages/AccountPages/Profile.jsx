import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as userValidation from "../../validation/userValidation";
import imgDefaultFemale from "../../assets/img/movie-01.jpg";
import imgDefaultMale from "../../assets/img/movie-02.jpg";

import {
  addProfileImgForUser,
  getUserData,
  updateUser,
} from "../../api/apiData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const loader = useSelector((state) => state.loader);

  const [userData, setUserData] = useState({});
  const profileSchema = yup.object().shape({
    firstName: userValidation.firstName,
    lastName: userValidation.lastName,
    phone: userValidation.phone,
    gender: userValidation.gender,
    age: userValidation.age,
  });

  const [img, setImg] = useState(null);
  const [check, setCheck] = useState(false);
  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };
  const navigate = useNavigate();

  const dataSubmit = (obj) => {
    updateUser(obj).then((data) => {
      if (data?.message) {
        if (img) {
          const formData = new FormData();
          formData.append("img", img);
          addProfileImgForUser(formData).then((data) => {
            if (data?.message) navigate("/");
          });
        } else navigate("/");
      }
    });
  };
  useEffect(() => {
    getUserData().then((data) => {
      if (data?.message) setUserData(data.data);
      setCheck(true);
    });
  }, [check]);
  return (
    <>
      <main className="container pt-5">
        <h2 className="pb-4 text-light">Profile Page</h2>
        <section className="row">
          <article className="col-lg-3 col-md-4 col-10 mx-md-0 mx-auto ">
            <div className="position-relative img-size">
              {check && (
                <img
                  src={
                    img
                      ? URL.createObjectURL(img)
                      : userData?.profile_img?.secure_url
                      ? userData.profile_img.secure_url
                      :userData.gender==="female"? imgDefaultFemale:imgDefaultMale
                  }
                  alt="Profile"
                  className="w-100 rounded-3 shadow-sm "
                />
              )}

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
          {check && (
            <Formik
              validationSchema={profileSchema}
              onSubmit={dataSubmit}
              initialValues={{
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                phone: userData.phone || "",
                age: userData.age || "",
                gender: userData.gender || "",
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
                  className="col-lg-6 col-md-7 col-10 mx-auto  pt-md-0 pt-3 text-light"
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
                      checked={values.gender === "male"}
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
                      checked={values.gender === "female"}
                      onChange={handleChange}
                      isInvalid={touched.gender && errors.gender}
                    />
                  </Form.Group>
                  <div className="py-3">
                    <Button type="submit" className="btn-primary">
                    {loader ? "Save Change" : "Waiting......"} 
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </section>
      </main>
    </>
  );
}
