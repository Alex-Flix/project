import React, { useEffect, useState } from "react";
import { adminGetAllOrders } from "../../api/apiOrder";
import {
  UpdateOrderStatus,
  deleteOrderStatus,
  showOrderDetails,
} from "../../Utils/orderUtils";

export default function OrdersList() {
  const [orderList, setOrderList] = useState([]);

  const approvedOrder = (obj) => {
    if (obj.status === "pending")
      UpdateOrderStatus({ obj, orderList, setOrderList });
  };

  const cancelledOrder = (obj) => {
    if (obj.status !== "cancelled" && obj.status !== "shipped")
      deleteOrderStatus({ obj, orderList, setOrderList });
  };

  useEffect(() => {
    adminGetAllOrders().then((data) => {
      if (data?.message) setOrderList(data.data);
    });
  }, []);

  return (
    <>
      <section className="col-xl-10 py-5 text-light offset-xl-2">
        <h2 className="pt-xl-0 py-3 ps-4 ">Order List</h2>
        {orderList.length ? (
          <div className="row row-cols-1">
            <article className="table-header row d-xl-flex d-none px-xl-3 pb-4 pt-2 col-lg-11 mx-auto bg-blue-dark border border-1 border-bottom-0">
              <p className="lead col">Name</p>
              <p className="lead col">Address</p>
              <p className="lead col">Contact</p>
              <p className="lead col text-center">Total_price</p>
              <p className="lead col text-center">Products</p>
              <p className="lead col text-center">Status</p>
              <p className="lead col text-center">Action</p>
            </article>

            {orderList.map((item, index) => (
              <article
                className={
                  "row align-items-center col-xl-11 col-10 mx-auto p-lg-3 p-5 border border-1  list-hover " +
                  (index % 2 === 1 && "bg-blue-dark")
                }
                key={item._id}
              >
                <div className="col-xl col-12 row align-items-center">
                  <p className="lead d-xl-none d-block col-6">Name</p>
                  <p className="col-xl col-6 text-xl-start text-end">
                    {item.user_id.firstName + " " + item.user_id.lastName}
                  </p>
                </div>
                <div className="col-xl col-12 row">
                  <p className="lead d-xl-none d-block col-6">Address</p>
                  <p className="col-xl col-6 text-xl-start text-end">
                    {item.address.building +
                      " " +
                      item.address.street +
                      " - " +
                      item.address.city}
                  </p>
                </div>
                <div className="col-xl col-12 row">
                  <p className="lead d-xl-none d-block col-6">Contact</p>
                  <p className="col-xl col-6 text-xl-start text-end">
                    {item.contact_phone}
                  </p>
                </div>
                <div className="col-xl col-12 row">
                  <p className="lead d-xl-none d-block col-6">Total_price</p>
                  <p className="col-xl col-6 text-xl-center text-end">
                    ${item.total_price}
                  </p>
                </div>
                <div className="col-xl col-12 row">
                  <p className="lead d-xl-none d-block col-6">Products</p>
                  <p className="col-xl col-6 h4 text-xl-center text-end">
                    <span className="badge bg-primary">
                      {item.products.length}
                    </span>
                  </p>
                </div>
                <div className="col-xl col-12 row">
                  <p className="lead d-xl-none d-block col-6">Status</p>
                  <p className="col-xl col-6 h4 text-xl-center text-end ">
                    <span
                      className={
                        "badge  " +
                        (item.status === "shipped"
                          ? "bg-warning"
                          : item.status === "approved"
                          ? "bg-success"
                          : item.status === "pending"
                          ? "bg-primary"
                          : "bg-danger")
                      }
                    >
                      {item.status}
                    </span>
                  </p>
                </div>
                <div className="col-xl col-12 row ">
                  <p className="lead d-xl-none d-block col-6">Action</p>
                  <p className="col-xl col-6 text-xl-center text-end d-flex flex-nowrap justify-content-xl-center justify-content-end">
                    <i
                      className="fa-solid fa-eye  me-2 p-2 bg-info rounded-2 cursor text-red"
                      onClick={() => showOrderDetails(item)}
                    ></i>
                    <i
                      className={
                        "fa-solid fa-check me-2 p-2 bg-success rounded-2 " +
                        (item.status !== "pending"
                          ? "text-light"
                          : "cursor text-red")
                      }
                      onClick={() => approvedOrder(item)}
                    ></i>
                    <i
                      className={
                        "fa-solid fa-ban p-2 bg-danger rounded-2 " +
                        (item.status === "cancelled" ||
                        item.status === "shipped"
                          ? "text-light"
                          : "cursor text-red")
                      }
                      onClick={() => cancelledOrder(item)}
                    ></i>
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
        </div>
        )}
      </section>
    </>
  );
}
