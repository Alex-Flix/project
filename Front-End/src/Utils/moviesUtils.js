import Swal from "sweetalert2";
import { deleteMovieById, updateMovieById } from "../api/apiMovies";
import imgDefault from "../assets/img/Add-Movies.jpg";

export const showMovieDetails = (data) => {
  const productList = data.products
    .map(
      (item) => `<li>
    <ul class="py-1 list-unstyled">
    <li><b>Name : </b> ${item.name}</li>
    <li><b>Price : </b> $${item.price}</li>
    <li><b>Available : </b> ${item.available}</li>
  </ul>
   </li>`
    )
    .join("");
  const content = `
  <div class="w-50 mx-auto pb-3">
  <img src=${
    data?.poster_image ? data.poster_image : imgDefault
  } alt="Profile"  class="w-100 rounded-3"/>    
  </div>
        <ul>
          <li class="py-1"><b>Movie Name : </b> ${data.name}</li>
          <li class="py-1"><b>Type : </b> ${data.type}</li>
          <li class="py-1"><b>Category : </b> ${data.category.join(" - ")}</li>
          <li class="py-1"><b>Year : </b> ${data.production_year}</li>
          <li class="py-1"><b>Rate : </b> ${data.rate}</li>
          <li class="py-1"><b>Description : </b> ${data.description}</li>
          ${
            productList.length
              ? `
          <li class="py-1">
            <b>Products : </b>
            <ul>${productList}</ul>
          </li>`
              : ""
          }
        </ul>
      `;

  return Swal.fire({
    title: "Movie Details",
    html: content,
    width: "1000px",
  });
};

export const updateMovieData = ({
  obj,
  movieList,
  setMovieList,
  movieListSearch,
  setMovieListSearch,
  objData,
  setShow,
}) => {
  updateMovieById(obj._id, obj).then((data) => {
    if (data?.message) {
      if (data?.message) {
        if (movieListSearch.length)
          setMovieListSearch(
            movieListSearch.map((item) => {
              if (item._id === obj._id) {
                item.products = objData;
                return item;
              }
              return item;
            })
          );

        setMovieList(
          movieList.map((item) => {
            if (item._id === obj._id) {
              item.products = objData;
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

export const deleteMovieData = ({
  obj,
  movieList,
  setMovieList,
  movieListSearch,
  setMovieListSearch,
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
      text: `You want to Delete Movie Name : ${obj.name} `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteMovieById(obj._id).then((data) => {
          if (data?.message) {
            if (movieListSearch.length)
              setMovieListSearch(
                movieListSearch.filter((item) => item._id !== obj._id)
              );

            setMovieList(movieList.filter((item) => item._id !== obj._id));
            swalWithBootstrapButtons.fire({
              title: "Done!",
              icon: "success",
            });
          }
        });
      }
    });
};

export const productListForm = (data) => {
  if (data) {
    return data.map((item) => {
      return {
        value: item._id,
        label: (
          <div key={item._id}>
            {item.images && item.images.length ? (
              <img
                src={item.images.length && item.images[0].secure_url}
                alt={item.name}
                style={{ width: "20px", marginRight: "10px" }}
              />
            ) : (
              ""
            )}
            {item.name}
          </div>
        ),
        list: {
          _id: item._id,
          images: item.images,
          name: item.name,
        },
      };
    });
  }
  return [];
};
