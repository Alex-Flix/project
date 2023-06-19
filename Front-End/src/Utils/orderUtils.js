import Swal from "sweetalert2";
import { adminDeleteOrderById, adminUpdateOrderById } from "../api/apiOrder";

export const showOrderDetails = (data) => {
  const productsList = data.products
    .map(
      (item) => `<li>
    <ul class="py-1 list-unstyled">
    <li><b>Name : </b> ${item.name}</li>
    <li><b>Price : </b> $${item.price}</li>
  </ul>
   </li>`
    )
    .join("");
  const content = `
      <ul>
        <li class="py-1"><b>User Name : </b> ${
          data.user_id.firstName + " " + data.user_id.lastName
        }</li>
        <li class="py-1"><b>Address : </b> ${
          data.address.building +
          " " +
          data.address.street +
          " - " +
          data.address.city
        }</li>
        <li class="py-1"><b>Contact : </b> ${data.contact_phone}</li>
        <li class="py-1"><b>Total_price : </b> $${data.total_price}</li>
        <li class="py-1"><b>Status : </b> ${data.status}</li>
        ${
          productsList.length
            ? `
        <li class="py-1">
          <b>Products : </b>
          <ul>${productsList}</ul>
        </li>`
            : ""
        }
      </ul>
    `;

  return Swal.fire({
    title: "Order Details",
    html: content,
    icon: "info",
  });
};

export const UpdateOrderStatus = ({ obj, orderList, setOrderList }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: `You want to Change Status to Approved of Order User ${
        obj.user_id.firstName + " " + obj.user_id.lastName
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        adminUpdateOrderById(obj._id).then((data) => {
          if (data?.message) {
            setOrderList(
              orderList.map((item) => {
                if (item._id === obj._id) {
                  item.status = "approved";
                  return item;
                }
                return item;
              })
            );
            swalWithBootstrapButtons.fire({
              title: "Done!",
              icon: "success",
            });
          }
        });
      }
    });
};

export const deleteOrderStatus = ({ obj, orderList, setOrderList }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: `You want to Cancelled Order Of User ${
        obj.user_id.firstName + " " + obj.user_id.lastName
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        adminDeleteOrderById(obj._id).then((data) => {
          if (data?.message) {
            setOrderList(
              orderList.map((item) => {
                if (item._id === obj._id) {
                  item.status = "cancelled";
                  return item;
                }
                return item;
              })
            );
            swalWithBootstrapButtons.fire({
              title: "Done!",
              icon: "success",
            });
          }
        });
      }
    });
};
