import React, { useEffect, useState } from "react";
import imgDefault from "../../assets/img/01.jpg";
import { useSearchParams } from "react-router-dom";
import { getAllProducts, searchProduct } from "../../api/apiProduct";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {
  deleteProductData,
  showProductDetails,
  updateProductData,
} from "../../Utils/productUtils";
import ProductModule from "../../components/ProductModule";
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productList, setProductList] = useState([]);
  const [productListSearch, setProductListSearch] = useState([]);
  const [searchName, setSearchName] = useState("");

  const [show, setShow] = useState(false);
  const [itemSelect, setItemSelect] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  const handleShow = (obj) => {
    setShow(true);
    setItemSelect(obj);
  };

  const deleteProduct = (obj) => {
    deleteProductData({
      obj,
      productList,
      setProductList,
      productListSearch,
      setProductListSearch,
    });
  };

  const updateProduct = (obj) => {
    updateProductData({
      obj,
      productList,
      setProductList,
      productListSearch,
      setProductListSearch,
      setShow,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchName) {
      setSearchParams(`name=${searchName}`);
      searchProduct(searchName).then((data) => {
        if (data?.message) setProductListSearch(data.products);
      });
    } else {
      setProductListSearch([]);
      searchParams.delete("name");
      setSearchParams(searchParams);
    }
  };
  useEffect(() => {
    getAllProducts(
      searchParams.get("page") ? searchParams.get("page") : 1
    ).then((data) => {
      if (data?.message) {
        setProductList(data.allProducts);
        setTotalPages(data.totalPages);
      }
    });
  }, [searchParams]);

  return (
    <>
      <section className="col-xl-10 py-5 text-light">
        <h2 className="pb-2 ">Product List</h2>
        <Form
          className="d-flex col-xl-4 col-lg-11 col-10 mx-lg-0 mx-auto ms-lg-auto py-4 pe-lg-5"
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
        {productListSearch.length || productList.length ? (
          <div className="row row-cols-1">
            <article className="table-header row d-xl-flex d-none px-xl-3 pb-4 pt-2 col-lg-11 mx-auto border border-1 border-bottom-0 bg-blue-dark">
              <p className="lead col">Img</p>
              <p className="lead col">Name</p>
              <p className="lead col">Category</p>
              <p className="lead col">Price</p>
              <p className="lead col text-center">Available</p>
              <p className="lead col text-center">Action</p>
            </article>
            {(productListSearch.length ? productListSearch : productList).map(
              (item, index) => (
                <article
                  className={
                    "row align-items-center col-xl-11 col-10 mx-auto p-lg-3 p-5 border border-1 list-hover " +
                    (index % 2 === 1 && "bg-blue-dark")
                  }
                  key={item._id}
                >
                  <div className="col-xl col-12 py-xl-0 py-3 row align-items-center">
                    <p className="lead d-xl-none d-block col-6">Img</p>
                    <div className="col-xl col-6 w-25 ms-xl-0 ms-auto text-xl-start text-end">
                      <img
                        src={
                          item.images.length
                            ? item.images[0].secure_url
                            : imgDefault
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
                      {item.category}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Price</p>
                    <p className="col-xl col-6 text-xl-start text-end">
                      ${item.price}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Available</p>
                    <p className="col-xl col-6 h4 text-xl-center text-end">
                      <span
                        className={
                          "badge " +
                          (item.available ? "bg-success" : "bg-danger")
                        }
                      >
                        {item.available}
                      </span>
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Action</p>
                    <p className="col-xl col-6 text-xl-start text-end d-flex flex-nowrap justify-content-xl-center justify-content-end">
                      <i
                        className="fa-solid fa-eye  me-2 p-2 bg-info rounded-2 cursor text-red"
                        onClick={() => showProductDetails(item)}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square me-2 p-2 bg-success rounded-2 cursor text-red"
                        onClick={() => handleShow(item)}
                      ></i>
                      <i
                        className="fa-solid fa-trash-can p-2 bg-danger rounded-2 text-red cursor"
                        onClick={() => deleteProduct(item)}
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
        <div
          className="py-4 w-75 mx-auto"
          onClick={() => window.scrollTo(0, 0)}
        >
          <PaginationControl
            page={searchParams.get("page") ? +searchParams.get("page") : 1}
            total={
              searchParams.get("name") ? 0 : totalPages > 1 ? totalPages : 0
            }
            limit={1}
            changePage={(page) => {
              setSearchParams(`page=${page}`);
            }}
            ellipsis={1}
          />
        </div>
      </section>
      <ProductModule
        show={show}
        setShow={setShow}
        itemSelect={itemSelect}
        updateProduct={updateProduct}
      />
    </>
  );
}
