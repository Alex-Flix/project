import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, searchProduct } from "../../api/apiEcommerce";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToCart } from "./../../store/Slice/cart";

export default function Store() {
  const [allProducts, setProdcts] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationState, setPagination] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  let searchMovie = searchParams.get("movie");
  let searchMinPrice = searchParams.get("minPrice");
  let searchMaxPrice = searchParams.get("maxPrice");
  let searchCategory = searchParams.get("category");
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    movie: "",
    minPrice: 0,
    // maxPrice: 150,
    maxPrice: "max",
    category: "",
  });

  function searchProductsHandler(e) {
    let newQuery = { ...query };
    newQuery[e.target.name] = e.target.value;
    setQuery(newQuery);
    console.log(newQuery);
    let string = "";
    for (let item of ["movie", "minPrice", "maxPrice", "category"]) {
      if (newQuery[item] && newQuery[item] !== "max")
        string += `${item}=${newQuery[item]}&`;
    }
    string = string.slice(0, -1);
    navigate(`/store/search?${string}`);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (searchMovie || searchMinPrice || searchMaxPrice || searchCategory) {
      searchProducts();
      setPagination(false);
    } else {
      setPagination(true);
      getProducts();
      navigate(`/store?page=${page}`);
    }
  }, [
    page,
    paginationState,
    searchMovie,
    searchMaxPrice,
    searchMinPrice,
    searchCategory,
  ]);

  async function getProducts() {
    let products = await getAllProduct(page);
    setQuery({
      movie: "",
      minPrice: 0,
      maxPrice: "max",
      category: "",
    });
    setProdcts(products);
    console.log(query);
  }

  async function searchProducts() {
    let newProducts = await searchProduct(query);
    setProdcts(newProducts);
  }

  function getProductDetails(id) {
    navigate(`/store/product/${id}`);
  }

  function increasePage(e) {
    if (page === 16) return;
    let newP = page;
    newP++;
    setPage(newP);
  }
  function decreasePage() {
    if (page === 1) return;
    let newP = page;
    newP--;
    setPage(newP);
  }
  if (!allProducts) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {" "}
        <i className="fas fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
      </div>
    );
  }

  return (
    <div className="bg-light">
      <section id="page-header">
        <h2>Super value deals</h2>
        <p>save more coupons & up to 70% off!</p>
      </section>

      <section id="product-search">
        <input
          type="text"
          name="movie"
          className="search-bar "
          placeholder="What's you favorite movie?"
          id=""
          value={query.movie}
          onChange={searchProductsHandler}
        />

        <div className="product-filters">
          <input
            type="number"
            name="minPrice"
            min="0"
            placeholder="min"
            id=""
            value={query.minPrice === 0 ? "" : query.minPrice}
            onChange={searchProductsHandler}
          />
          <input
            type="number"
            name="maxPrice"
            min="0"
            className="mx-1"
            value={query.maxPrice === "max" ? "" : query.maxPrice}
            placeholder="max"
            id=""
            onChange={searchProductsHandler}
          />
          <select
            name="category"
            id=""
            onChange={searchProductsHandler}
            value={query.category}
          >
            <option value="">All</option>
            <option value="Accessories">Accessories</option>
            <option value="Mug">Mug</option>
            <option value="T-shirt">T-shirts</option>
          </select>
        </div>
      </section>
      <section id="product1" className="section-p1">
        <div className="pro-container">
          {allProducts?.map((product) => (
            <div key={product._id} className="pro bg-light">
              <img
                src={product.images[0].secure_url}
                className="full-width "
                alt=""
                onClick={() => getProductDetails(product._id)}
              />
              <div className="des">
                <span className="mb-1">{product.category}</span>
                <h5 className="m-0">{product.name}</h5>
                <div className="star">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h4>${product.price}</h4>
              </div>
              <span
                href=""
                className="cart-icon"
                onClick={() => {
                  let obj = { ...product, quantity: 1 };
                  dispatch(addToCart(obj));
                }}
              >
                <i className="fa-solid fa-cart-plus cart"></i>
              </span>
            </div>
          ))}
        </div>
        {allProducts.length === 0 && <span>Not found</span>}
      </section>
      {paginationState && (
        <section id="pagination" className="section-p1">
          <button
            disabled={page === 1 ? true : false}
            onClick={() => decreasePage()}
          >
            <i className="fa-solid fa-long-arrow-alt-left"></i>
          </button>
          <button className="mx-1" onClick={() => setPage(1)}>
            1
          </button>
          <button className="mx-1" onClick={() => setPage(2)}>
            2
          </button>
          <button
            className=""
            disabled={page === 16 ? true : false}
            onClick={(e) => increasePage(e)}
          >
            <i className="fa-solid fa-long-arrow-alt-right"></i>
          </button>
        </section>
      )}
    </div>
  );
}
