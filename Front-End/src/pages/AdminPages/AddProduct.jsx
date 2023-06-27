import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as productValidation from "../../validation/productValidation";
import imgDefault from "../../assets/img/Add-Product.jpg";
import Swal from "sweetalert2";
import { createProduct } from "../../api/apiProduct";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const loader = useSelector((state) => state.loader);

  const addProductSchema = yup.object().shape({
    name: productValidation.name,
    price: productValidation.price,
    description: productValidation.description,
    available: productValidation.available,
    category: productValidation.category,
  });
  const [img, setImg] = useState([]);

  const handleImg = (e) => {
    if (img.length < 5) setImg([...img, ...e.target.files]);
  };

  const dataSubmit = (obj, { resetForm }) => {
    if (!img.length)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "img must be at least 1",
      });

    const formData = new FormData();
    img.forEach((item) => formData.append("img", item));
    formData.append("name", obj.name);
    formData.append("price", obj.price);
    formData.append("description", obj.description);
    formData.append("available", obj.available);
    formData.append("category", obj.category);

    createProduct(formData).then((data) => {
      if (data?.message) {
        Swal.fire({
          icon: "success",
          title: data.message,
        });
        resetForm();
        setImg([]);
      }
    });
  };

  const deleteImg = (index) => {
    const list = [...img];
    list.splice(index, 1);
    setImg(list);
  };

  return (
    <>
      <section className="col-xl-10 py-5 text-light offset-xl-2">
        <h2 className="pt-xl-0 pt-3 pb-2 ms-lg-5">Add Product</h2>
        <section className="row">
          <article className="col-lg-3 col-md-4 col-10  mx-auto ">
            <div className="row col-xl-9  col-11 mx-auto">
              {new Array(5).fill(0).map((item, index) => (
                <div
                  className={
                    "position-relative  " + (!index ? "col-12" : "col-6 py-3")
                  }
                  key={`data_${index}`}
                >
                  <img
                    src={
                      img[index] ? URL.createObjectURL(img[index]) : imgDefault
                    }
                    alt="Profile"
                    className="w-100 rounded-3 shadow-sm"
                  />
                  {img[index] ? (
                    <div
                      className="position-absolute text-danger fa-xl cursor"
                      style={
                        index
                          ? { top: "20px", right: "20px" }
                          : { top: "10px", right: "30px" }
                      }
                      onClick={() => deleteImg(index)}
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                  ) : (
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
                        multiple
                      />
                    </Form.Group>
                  )}
                </div>
              ))}
            </div>
          </article>
          <Formik
            validationSchema={addProductSchema}
            onSubmit={dataSubmit}
            initialValues={{
              name: "",
              price: "",
              description: "",
              available: "",
              category: "",
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
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder=" "
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.price && !errors.price}
                    isInvalid={touched.price && errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.description && !errors.description}
                    isInvalid={touched.description && errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.category && !errors.category}
                    isInvalid={touched.category && errors.category}
                  >
                    <option>Select One</option>
                    {productValidation.validCategories.map((item, index) => (
                      <option value={item} key={`data_${index}`}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="available">
                  <Form.Label>Available</Form.Label>
                  <Form.Control
                    type="number"
                    name="available"
                    placeholder=" "
                    value={values.available}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.available && !errors.available}
                    isInvalid={touched.available && errors.available}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.available}
                  </Form.Control.Feedback>
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
