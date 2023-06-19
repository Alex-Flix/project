import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { userPostNewOrder } from "../../api/apiOrder";
import {
  removeAllFromCart,
  removeFromCart,
  updateQuantity,
} from "./../../store/Slice/cart";
import ConfirmOrderForm from "./ConfirmOrderForm";

export default function Cart() {
  const cartProducts = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();

  let totalPrice =
    cartProducts.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.price,
      0
    ) + 10;

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    city: "",
    street: "",
    building: "",
    notes: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    city: "",
    street: "",
    building: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs
    const { city, street, building, phone } = formData;
    let formIsValid = true;
    const errorsCopy = { ...errors };

    if (city.trim() === "") {
      errorsCopy.city = "Please enter a city";
      formIsValid = false;
    } else {
      errorsCopy.city = "";
    }

    if (street.trim() === "") {
      errorsCopy.street = "Please enter a street";
      formIsValid = false;
    } else {
      errorsCopy.street = "";
    }

    if (building.trim() === "") {
      errorsCopy.building = "Please enter a building";
      formIsValid = false;
    } else {
      errorsCopy.building = "";
    }

    if (phone.trim() === "") {
      errorsCopy.phone = "Please enter a phone number";
      formIsValid = false;
    } else if (!/^\d{11}$/.test(phone)) {
      errorsCopy.phone = "Please enter a valid 11-digit phone number";
      formIsValid = false;
    } else {
      errorsCopy.phone = "";
    }

    setErrors(errorsCopy);

    // If the form is valid, proceed with form submission
    if (formIsValid) {
      // Hide the modal
      setShowModal(false);

      // Display SweetAlert confirmation with form input data
      Swal.fire({
        title: "Confirm Details",
        html: `
          <p><strong>City:</strong> ${formData.city}</p>
          <p><strong>Street:</strong> ${formData.street}</p>
          <p><strong>Building:</strong> ${formData.building}</p>
          <p><strong>Notes:</strong> ${formData.notes}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Form is confirmed, proceed with form submission
          // You can perform additional actions here if needed
          console.log("Form submitted with data:", formData);

          let newProducts = cartProducts.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          }));

          let data = await userPostNewOrder({
            products: newProducts,
            total_price: totalPrice,
            address: {
              city: formData.city,
              street: formData.street,
              building: formData.building,
            },
            contact_phone: formData.phone,
            notes: formData.notes,
          });

          if (data) {
            Swal.fire({
              icon: "success",
              title: "Order Confirmed",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(removeAllFromCart());
          }

          // Reset the form data
          setFormData({
            city: "",
            street: "",
            building: "",
            notes: "",
            phone: "",
          });
        }
      });
    }
  };

  return (
    <section id="cart" className="section-p1 container text-light ">
      <table className="full-width">
        <thead>
          <tr>
            <td>IMAGE</td>
            <td>PRODUCT</td>
            <td>PRICE</td>
            <td>QUANTITY</td>
            <td>AVAILABLE</td>
            <td>REMOVE</td>
            <td>SUBTOTAL</td>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product) => (
            <tr key={product._id}>
              <td>
                <Link to={`/store/product/${product._id}`}>
                  <img src={product.images[0]?.secure_url} alt="" />
                </Link>
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <div className="qty text-center">
                  <span
                    className="minus bg-danger"
                    onClick={() => {
                      let newqunatity = product.quantity;
                      newqunatity--;
                      if (newqunatity < 1) return;
                      dispatch(
                        updateQuantity({
                          id: product._id,
                          quantity: newqunatity,
                        })
                      );
                    }}
                  >
                    -
                  </span>
                  <input
                    type="number"
                    className="count border-0 bg-transparent text-white "
                    name="qty"
                    value={product.quantity}
                    disabled
                    max={product.available}
                    placeholder={product.quantity}
                    min="1"
                  />
                  <span
                    className="plus bg-success"
                    onClick={() => {
                      let newqunatity = product.quantity;
                      newqunatity++;
                      if (newqunatity > product.available) return;
                      dispatch(
                        updateQuantity({
                          id: product._id,
                          quantity: newqunatity,
                        })
                      );
                    }}
                  >
                    +
                  </span>
                </div>
              </td>
              <td>{product.available - product.quantity}</td>
              <td onClick={() => dispatch(removeFromCart(product._id))}>
                <i
                  className="fa-solid fa-trash fs-5 del"
                  style={{ color: "#a70101" }}
                ></i>
              </td>
              <td> ${product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <div className="total-price ml-auto">
          <table className="full-width">
            <tbody>
              <tr>
                <td>SUBTOTAL</td>
                <td>
                  $
                  {cartProducts.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.quantity * currentValue.price,
                    0
                  )}{" "}
                </td>
              </tr>
              <tr>
                <td>TAX</td>
                <td>$10.00 </td>
              </tr>
              <tr>
                <td>TOTAL</td>
                <td>${totalPrice}</td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn btn-outline-success w-100"
            onClick={() => setShowModal(true)}
          >
            Check Out
          </button>
          {showModal && (
            <ConfirmOrderForm
            showModal={showModal}
            setShowModal={setShowModal}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          
            />
          )}
        </div>
      </div>
    </section>
  );
}
