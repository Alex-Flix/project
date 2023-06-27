import React, { useEffect, useState } from "react";
import imgDefault from "../../assets/img/Add-Movies.jpg";
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
import { movieCategories } from "./../../validation/movieValidation";
import { Formik } from "formik";

export default function MoviesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState([]);
  const [movieListSearch, setMovieListSearch] = useState([]);

  const [show, setShow] = useState(false);
  const [itemSelect, setItemSelect] = useState({});

  const handleShow = (obj) => {
    setShow(true);
    setItemSelect(obj);
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

  const updateMovie = (obj, objData) => {
    updateMovieData({
      obj,
      movieList,
      setMovieList,
      movieListSearch,
      setMovieListSearch,
      setShow,
      objData,
    });
  };

  const dataSubmit = (obj) => {
    const hasEmptyValue = Object.values(obj).every((value) => value === "");
    if (!hasEmptyValue) {
      setSearchParams(
        `${obj.name && "name=" + obj.name}&${obj.type && "type=" + obj.type}&${
          obj.category && "category=" + obj.category
        }`
      );
      searchMovie(obj).then((data) => {
        if (data?.message) setMovieListSearch(data.data);
      });
    } else {
      setMovieListSearch([]);
      searchParams.delete("name");
      searchParams.delete("type");
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    getAllMovies().then((data) => {
      if (data?.message) setMovieList(data.data);
    });
    if (searchParams.size) {
      const params = {};
      for (const [key, value] of searchParams) {
        params[key] = value;
      }
      searchMovie(params).then((data) => {
        if (data?.message)
        if (data?.message && data.data.length) {
          setMovieListSearch(data.data);
        } 
        else {
          setMovieListSearch([]);
        }
      });
    }
  }, []);

  return (
    <>
      <section className="col-xl-10 py-5 text-light offset-xl-2">
        <h2 className="pt-xl-0 pt-3 ps-4 ">Movies List</h2>
        <Formik
          onSubmit={dataSubmit}
          initialValues={{
            name: searchParams.get("name") ? searchParams.get("name") : "",
            type: searchParams.get("type") ? searchParams.get("type") : "",
            category: searchParams.get("category")
              ? searchParams.get("category")
              : "",
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form
              className="d-flex flex-wrap flex-md-nowrap  col-xl-6 col-lg-11 col-10 mx-lg-0 mx-auto ms-lg-auto py-4 pe-lg-5"
              onSubmit={handleSubmit}
            >
              <div className="d-flex order-md-0 order-1 col-md-6 col-12 me-3 ">
                <Form.Group className="me-2 col-6" controlId="type">
                  <Form.Select
                    name="type"
                    onChange={handleChange}
                    defaultValue={searchParams.get("type")}
                  >
                    <option value="">Select Types</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="anime">Anime</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col-6" controlId="category">
                  <Form.Select
                    name="category"
                    onChange={handleChange}
                    defaultValue={searchParams.get("category")}
                  >
                    <option value="">Select Category</option>
                    {movieCategories.map((item, index) => (
                      <option value={item.value} key={`data_${index}`}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <Form.Group
                controlId="name"
                className="d-flex order-md-1 order-0 col-md-6 col-12 mb-2"
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={values.name}
                  onChange={handleChange}
                />

                <Button type="submit" variant="outline-primary">
                  Search
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
        {movieListSearch.length || movieList.length ? (
          <div className="row row-cols-1">
            <article className="table-header row d-xl-flex d-none px-xl-3 pb-4 pt-2 col-lg-11 mx-auto border border-1 border-bottom-0 bg-blue-dark">
              <p className="lead col">Poster</p>
              <p className="lead col">Name</p>
              <p className="lead col">Category</p>
              <p className="lead col">Year</p>
              <p className="lead col text-center">Rate</p>
              <p className="lead col text-center">Products</p>
              <p className="lead col text-center">Action</p>
            </article>
            {(movieListSearch.length ? movieListSearch : movieList).map(
              (item, index) => (
                <article
                  className={
                    "row align-items-center col-xl-11 col-10 mx-auto p-lg-3 p-5 border border-1 list-hover " +
                    (index % 2 === 1 && "bg-blue-dark")
                  }
                  key={item._id}
                >
                  <div className="col-xl col-12 py-xl-0 py-3 row align-items-center">
                    <p className="lead d-xl-none d-block col-6">Poster</p>
                    <div className="col-xl col-6 w-25 ms-xl-0 ms-auto text-xl-start text-end">
                      <img
                        src={
                          item?.poster_image ? item.poster_image : imgDefault
                        }
                        alt="Profile"
                        className="col-xl-8 col-lg-6 col-12 rounded-3"
                      />
                    </div>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Name</p>
                    <p className="col-xl col-6 text-xl-start text-end">
                      {item.name}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Category</p>
                    <p className="col-xl col-6 text-xl-start text-end">
                      {item.category.length ? item.category.join(" - ") : ""}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Year</p>
                    <p className="col-xl col-6 text-xl-start text-end">
                      {item.production_year}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Rate</p>
                    <p className="col-xl col-6 h4 text-xl-center text-end">
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
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Products</p>
                    <p className="col-xl col-6 h4 text-xl-center text-end ">
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
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Action</p>
                    <p className="col-xl col-6 text-xl-center text-end d-flex flex-nowrap justify-content-xl-center justify-content-end">
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
        ) : (
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <i className="fas fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
          </div>
        )}
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
