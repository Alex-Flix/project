import React, { useEffect, useState } from "react";
import imgDefault from "../../assets/img/01.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import { getAllMovies, searchMovie } from "../../api/apiMovies";
import {
  deleteMovieData,
  showMovieDetails,
  updateMovieData,
} from "../../Utils/moviesUtils";
import MoviesModule from "../../components/MoviesModule";

export default function MoviesList() {
  const [searchName, setSearchName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState([]);
  const [movieListSearch, setMovieListSearch] = useState([]);

  const [show, setShow] = useState(false);
  const [itemSelect, setItemSelect] = useState({});

  const handleShow = (obj) => {
    setShow(true);
    setItemSelect(obj);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchName) {
      setSearchParams(`name=${searchName}`);
      searchMovie(searchName).then((data) => {
        if (data?.message) setMovieListSearch(data.data);
      });
    } else {
      setMovieListSearch([]);
      searchParams.delete("name");
      setSearchParams(searchParams);
    }
  };

  const deleteMovie = (obj) => {
    deleteMovieData({
      obj,
      movieList,
      setMovieList,
      movieListSearch,
      setMovieListSearch,
    });
  };

  const updateMovie = (obj,objData) => {
    updateMovieData({
      obj,
      movieList,
      setMovieList,
      movieListSearch,
      setMovieListSearch,
      setShow,
      objData
    });
  };

  useEffect(() => {
    getAllMovies().then((data) => {
      if (data?.message) setMovieList(data.data);
    });
  }, []);

  return (
    <>
      <section className="col-md-10 py-5 text-light">
        <h2 className="pb-2 ">Movies List</h2>
        <Form
          className="d-flex col-lg-4 col-10 mx-lg-0 mx-auto ms-lg-auto py-4 pe-lg-5"
          onSubmit={handleSearch}
        >
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            defaultValue={searchParams.get("name")}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button type="submit" variant="outline-primary">
            Search
          </Button>
        </Form>
        <div className="row row-cols-1">
          <article className="table-header row d-lg-flex d-none px-lg-3 pb-4 pt-2 col-lg-11 mx-auto border border-1 border-bottom-0 bg-blue-dark">
            <p className="lead col">Poster</p>
            <p className="lead col">Name</p>
            <p className="lead col">Category</p>
            <p className="lead col">Year</p>
            <p className="lead col text-center">Rate</p>
            <p className="lead col text-center">Products</p>
            <p className="lead col text-center">Action</p>
          </article>
          {(movieListSearch.length || movieList.length) &&
            (movieListSearch.length ? movieListSearch : movieList).map(
              (item, index) => (
                <article
                  className={
                    "row align-items-center col-lg-11 col-10 mx-auto p-lg-3 p-5 border border-1 list-hover " +
                    (index % 2 === 1 && "bg-blue-dark")
                  }
                  key={item._id}
                >
                  <div className="col-lg col-12 py-lg-0 py-3 row align-items-center">
                    <p className="lead d-lg-none d-block col-6">Poster</p>
                    <div className="col-lg col-6 w-25 ms-lg-0 ms-auto">
                      <img
                        src={
                          item?.poster_image ? item.poster_image : imgDefault
                        }
                        alt="Profile"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Name</p>
                    <p className="col-lg col-6 text-lg-start text-end">
                      {item.name}
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Category</p>
                    <p className="col-lg col-6 text-lg-start text-end">
                      {item.category.length ? item.category.join(" - ") : ""}
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Year</p>
                    <p className="col-lg col-6 text-lg-start text-end">
                      {item.production_year}
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Rate</p>
                    <p className="col-lg col-6 h4 text-lg-center text-end">
                      <span
                        className={
                          "badge " +
                          (item.rate >= 3 ? "bg-success" : "bg-danger")
                        }
                      >
                        {item.rate}
                      </span>
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Products</p>
                    <p className="col-lg col-6 h4 text-lg-center text-end ">
                      <span
                        className={
                          "badge  " +
                          (item.products.length ? "bg-primary" : "bg-danger")
                        }
                      >
                        {item.products.length}
                      </span>
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Action</p>
                    <p className="col-lg col-6 text-lg-center text-end">
                      <i
                        className="fa-solid fa-eye  me-2 p-2 bg-info rounded-2 cursor text-red"
                        onClick={() => showMovieDetails(item)}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square me-2 p-2 bg-success rounded-2 cursor text-red"
                        onClick={() => handleShow(item)}
                      ></i>
                      <i
                        className="fa-solid fa-trash-can p-2 bg-danger rounded-2 text-red cursor"
                        onClick={() => deleteMovie(item)}
                      ></i>
                    </p>
                  </div>
                </article>
              )
            )}
        </div>
      </section>
      <MoviesModule
        show={show}
        setShow={setShow}
        itemSelect={itemSelect}
        updateMovie={updateMovie}
      />
    </>
  );
}
