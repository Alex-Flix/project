import Swal from "sweetalert2";
import { deleteProductById, updateProductById } from "../api/apiProduct";
import imgDefault from "../assets/img/List-Product.jpg";

export const showProductDetails = (data) => {
  const content = `
  <div class="w-50 mx-auto pb-3">
  <img src=${
    data.images.length ? data.images[0].secure_url : imgDefault
  } alt="Profile"  class="w-100 rounded-3"/>    
  </div>
      <ul>
        <li class="py-1"><b>Product Name : </b> ${data.name}</li>
        <li class="py-1"><b>Category : </b> ${data.category}</li>
        <li class="py-1"><b>Price : </b> $${data.price}</li>
        <li class="py-1"><b>Available : </b> ${data.available}</li>
        <li class="py-1"><b>Description : </b> ${data.description}</li>
      </ul>
    `;

  return Swal.fire({
    title: "Product Details",
    html: content,
  });
};

export const updateProductData = ({
  obj,
  productList,
  productListSearch,
  setProductList,
  setProductListSearch,
  setShow,
}) => {
  updateProductById(obj._id, obj).then((data) => {
    if (data?.message) {
      if (data?.message) {
        if (productListSearch.length)
          setProductListSearch(
            productListSearch.map((item) => {
              if (item._id === obj._id) {
                item.price = obj.price;
                item.available = obj.available;
                return item;
              }
              return item;
            })
          );

        setProductList(
          productList.map((item) => {
            if (item._id === obj._id) {
              item.price = obj.price;
              item.available = obj.available;
              return item;
            }
            return item;
          })
        );
        setShow(false);
        Swal.fire({
          title: "Done!",
          icon: "success",
        });
      }
    }
  });
};

export const deleteProductData = ({
  obj,
  productList,
  productListSearch,
  setProductList,
  setProductListSearch,
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
      text: `You want to Delete Product Name : ${obj.name} `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteProductById(obj._id).then((data) => {
          if (data?.message) {
            if (productListSearch.length)
              setProductListSearch(
                productListSearch.filter((item) => item._id !== obj._id)
              );

            setProductList(productList.filter((item) => item._id !== obj._id));
            swalWithBootstrapButtons.fire({
              title: "Done!",
              icon: "success",
            });
          }
        });
      }
    });
};
