import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeAllFromCart,
  removeFromCart,
  updateQuantity,
} from "./../../store/Slice/cart";
export default function Cart() {
  const cartProducts = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();

  function addNewOrder() {
    dispatch(removeAllFromCart());
    // Axios.post()
  }
  return (
    <section id="cart" className="section-p1 container bg-light ">
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
                <input
                  type="number"
                  max={product.available}
                  placeholder={product.quantity}
                  onChange={(e) => {
                    // Get the entered value and the maximum value
                    const enteredValue = +e.target.value;
                    const maxValue = +product.available;

                    // Set the value of the input field to the entered value or the maximum value
                    let newValue = Math.min(enteredValue, maxValue);
                    if (newValue === 0) newValue = 1;
                    dispatch(
                      updateQuantity({ id: product._id, quantity: newValue })
                    );
                  }}
                  onKeyDown={(e) => {
                    const maxValue = +product.available;
                    if (+e.target.value > maxValue) {
                      e.preventDefault();
                    }
                  }}
                  min="1"
                />
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
              <td>
                $
                {cartProducts.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.quantity * currentValue.price,
                  0
                ) + 10}{" "}
              </td>
            </tr>
          </table>
          <button
            className="btn btn-outline-success w-100"
            onClick={() => addNewOrder()}
          >
            Check Out
          </button>
        </div>
      </div>
    </section>
  );
}
