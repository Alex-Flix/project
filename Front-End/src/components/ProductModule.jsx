import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import * as productValidation from "../validation/productValidation";

export default function ProductModule(props) {
  const loader = useSelector((state) => state.loader);

  const { show, setShow, itemSelect, updateProduct } = props;

  const addProductSchema = yup.object().shape({
    price: productValidation.price,
    available: productValidation.available,
  });

  const dataSubmit = (obj) => {
    updateProduct(obj);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Product Name : </b>
            {itemSelect.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={addProductSchema}
            onSubmit={dataSubmit}
            initialValues={{
              _id:itemSelect._id,
              price: itemSelect.price,
              available: itemSelect.available,
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
              <Form noValidate onSubmit={handleSubmit}>
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
                <div className="d-flex justify-content-between py-3">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    {loader ? "Update" : "Waiting......"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
