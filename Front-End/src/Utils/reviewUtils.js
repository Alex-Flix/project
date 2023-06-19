import Swal from "sweetalert2";
import { deleteReview } from "../api/apiReview";

export const deleteReviewByAdmin = ({ obj, reviewList, setReviewList }) => {
  console.log(obj);
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
      text: `You want to Delete Review of User ${
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
        deleteReview(obj._id).then((data) => {
          if (data?.message) {
            setReviewList(reviewList.filter((item) => item._id !== obj._id));
            swalWithBootstrapButtons.fire({
              title: "Done!",
              icon: "success",
            });
          }
        });
      }
    });
};
