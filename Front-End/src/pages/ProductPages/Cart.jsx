import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  let totalPrice = cartProducts.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.quantity * currentValue.price,
    0
  );
  const [tax, setTax] = useState(0);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTax(totalPrice * 0.05);
  }, [tax, totalPrice]);

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

    // Validate the input field and update errors state
    let error = "";
    if (value.trim() === "") {
      error = `Please enter a ${name}`;
    } else if (name === "phone" && !/^\d{11}$/.test(value)) {
      error = "Please enter a valid 11-digit phone number";
    }
    if (name !== "notes") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }

    // Update the form data state
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If the form is valid, proceed with form submission      // Hide the modal
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
  };

  return (
    <>
      <section
        id="cart"
        className="section-p1 container text-light border border-1 "
      >
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
                    <img
                      src={
                        product.image
                          ? product.image
                          : product.images[0]?.secure_url
                      }
                      alt=""
                    />
                  </Link>
                </td>
                <td className="p-0">{product.name}</td>
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
                        accumulator +
                        currentValue.quantity * currentValue.price,
                      0
                    )}{" "}
                  </td>
                </tr>
                <tr>
                  <td>TAX</td>
                  <td> ${tax} </td>
                </tr>
                <tr>
                  <td>TOTAL</td>
                  <td>${totalPrice + tax}</td>
                </tr>
              </tbody>
            </table>

            <button
              disabled={cartProducts.length > 0 ? false : true}
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
    </>
  );
}
