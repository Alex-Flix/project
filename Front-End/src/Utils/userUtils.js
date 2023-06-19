import Swal from "sweetalert2";
import { softDeleteUser } from "../api/apiData";



export const showUserDetails = (data) => {
  const favoritesList = data.favorites
    .map((favorite) => `<li>${favorite.name}</li>`)
    .join("");
  const content = `
      <ul>
        <li class="py-1"><b>First Name : </b> ${data.firstName}</li>
        <li class="py-1"><b>Last Name : </b> ${data.lastName}</li>
        <li class="py-1"><b>Email : </b> ${data.email}</li>
        <li class="py-1"><b>Phone : </b> ${data.phone}</li>
        <li class="py-1"><b>Gender : </b> ${data.gender}</li>
        <li class="py-1"><b>Age : </b> ${data.age}</li>
        <li class="py-1"><b>Admin : </b> ${data.isAdmin ? "yes" : "no"}</li>
        ${
          favoritesList.length ?
          `
        <li class="py-1">
          <b>Favorites : </b>
          <ul>${favoritesList}</ul>
        </li>`
       :"" }
      </ul>
    `;

  return Swal.fire({
    title: "User Details",
    html: content,
    icon: "info",
  });
};


export const confirmUserStatusChange = ({
  obj,
  userList,
  userListSearch,
  setUserList,
  setUserListSearch,
}) => {
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
      text: `You want to ${obj.status ? "Block" : "Activate"} User ${
        obj.firstName + " " + obj.lastName
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        softDeleteUser(obj._id).then((data) => {
          if (data?.message) {
            if (userListSearch.length)
              setUserListSearch(
                userListSearch.map((item) => {
                  if (item._id === obj._id) {
                    item.status = !item.status;
                    return item;
                  }
                  return item;
                })
              );

            setUserList(
              userList.map((item) => {
                if (item._id === obj._id) {
                  item.status = !item.status;
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
