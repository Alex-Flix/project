import React, { useEffect, useState } from "react";
import imgDefaultFemale from "../../assets/img/02.png";
import imgDefaultMale from "../../assets/img/03.png";

import { useSearchParams } from "react-router-dom";
import { getAllUsers, searchUser } from "../../api/apiData";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  confirmUserStatusChange,
  showUserDetails,
} from "../../Utils/userUtils";

import { PaginationControl } from "react-bootstrap-pagination-control";
import Swal from "sweetalert2";

export default function UserList() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const [userListSearch, setUserListSearch] = useState([]);
  const [searchName, setSearchName] = useState(
    searchParams.get("name") ? searchParams.get("name") : ""
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalSearchPages, setTotalSearchPages] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchName) {
      setSearchParams(`name=${searchName}`);
      searchUser(
        searchName,
        searchParams.get("searchPage") ? searchParams.get("searchPage") : 1
      ).then((data) => {
        if (data?.message && data.data.length) {
          setUserListSearch(data.data);
          setTotalSearchPages(data.totalPages);
        } else {
          setUserListSearch([]);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Search Not Found",
          });
        }
      });
    } else {
      setUserListSearch([]);
      searchParams.delete("name");
      searchParams.delete("searchPage");
      setSearchParams(searchParams);
    }
  };

  const blockUser = (obj) => {
    confirmUserStatusChange({
      obj,
      userList,
      setUserList,
      userListSearch,
      setUserListSearch,
    });
  };

  useEffect(() => {
    getAllUsers(searchParams.get("page") ? searchParams.get("page") : 1).then(
      (data) => {
        if (data?.message) {
          setUserList(data.data);
          setTotalPages(data.totalPages);
        }
      }
    );
    if (searchParams.get("name")) {
      searchUser(
        searchParams.get("name"),
        searchParams.get("searchPage") ? searchParams.get("searchPage") : 1
      ).then((data) => {
        if (data?.message && data.data.length) {
          setUserListSearch(data.data);
          setTotalSearchPages(data.totalPages);
        }
        else {
          setUserListSearch([]);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Search Not Found",
          });
        }
      });
    }
  }, [searchParams]);
  return (
    <>
      <section className="col-xl-10 py-5 text-light offset-xl-2">
        <h2 className="pt-xl-0 pt-3 ps-4">Users List</h2>
        <Form
          className="d-flex col-xl-4 col-lg-11 col-10 mx-lg-0 mx-auto ms-lg-auto pb-4 pe-lg-5"
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
        {userListSearch.length || userList.length ? (
          <div className="row row-cols-1">
            <article className="table-header row d-xl-flex d-none  px-xl-3  pb-4 pt-2 col-lg-11 mx-auto border border-1 border-bottom-0 bg-blue-dark">
              <p className="lead col">Profile</p>
              <p className="lead col-3 text-center">Name</p>
              <p className="lead col">Contact</p>
              <p className="lead col text-center">Gender</p>
              <p className="lead col text-center">Age</p>
              <p className="lead col text-center">Favorites</p>
              <p className="lead col text-center">Status</p>
              <p className="lead col text-center">Action</p>
            </article>

            {(userListSearch.length ? userListSearch : userList).map(
              (item, index) => (
                <article
                  className={
                    "row align-items-center col-xl-11 col-10 mx-auto p-lg-3 p-5 border border-1 list-hover " +
                    (index % 2 === 1 && "bg-blue-dark")
                  }
                  key={item._id}
                >
                  <div className="col-xl col-12 py-xl-0 py-3 row align-items-center">
                    <p className="lead d-xl-none d-block col-6">Profile</p>
                    <div className="col-xl col-6 w-25 ms-xl-0 ms-auto text-xl-start text-end ">
                      <img
                        src={
                          item?.profile_img?.secure_url
                            ? item.profile_img.secure_url
                            : item.gender === "female"
                            ? imgDefaultFemale
                            : imgDefaultMale
                        }
                        alt="Profile"
                        className="col-xl-8 col-lg-6 col-12 rounded-3 "
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-12 row">
                    <p className="lead d-xl-none d-block col-6">Name</p>
                    <p className="col-xl col-6 text-xl-center text-end">
                      {item.firstName + " " + item.lastName}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Contact</p>
                    <p className="col-xl col-6 text-xl-start text-end">
                      {item.phone}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Gender</p>
                    <p className="col-xl col-6 text-xl-center text-end text-uppercase">
                      {item.gender}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Age</p>
                    <p className="col-xl col-6 text-xl-center text-end ">
                      {item.age}
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Favorites</p>
                    <p className="col-xl col-6 h4 text-xl-center text-end">
                      <span
                        className={
                          "badge  " +
                          (item.favorites.length ? "bg-primary" : "bg-danger")
                        }
                      >
                        {item.favorites.length}
                      </span>
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6">Status</p>
                    <p className="col-xl col-6 h4 text-xl-center text-end d-flex flex-nowrap justify-content-xl-center justify-content-end align-items-center">
                      <span
                        className={
                          "badge  " + (item.status ? "bg-success" : "bg-danger")
                        }
                      >
                        {item.status ? "Active" : "Block"}
                      </span>
                    </p>
                  </div>
                  <div className="col-xl col-12 row">
                    <p className="lead d-xl-none d-block col-6 ">Action</p>
                    <p className="col-xl col-6 text-xl-center text-end d-flex flex-nowrap justify-content-xl-center justify-content-end">
                      <i
                        className="fa-solid fa-eye me-2 p-2 bg-info rounded-2 cursor text-red "
                        onClick={() => showUserDetails(item)}
                      ></i>
                      <i
                        className={
                          "fa-solid fa-ban p-2 rounded-2  cursor " +
                          (item.status
                            ? "text-red bg-danger"
                            : "text-light bg-success")
                        }
                        onClick={() => blockUser(item)}
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
            page={
              searchParams.get("name") && userListSearch.length
                ? +searchParams.get("searchPage")
                : searchParams.get("page")
                ? +searchParams.get("page")
                : 1
            }
            total={
              searchParams.get("name") && userListSearch.length
                ? totalSearchPages > 1
                  ? totalSearchPages
                  : 0
                : totalPages > 1
                ? totalPages
                : 0
            }
            limit={1}
            changePage={(page) => {
              searchParams.get("name") && userListSearch.length
                ? setSearchParams(
                    `name=${searchParams.get("name")}&&searchPage=${page}`
                  )
                : setSearchParams(`page=${page}`);
            }}
            ellipsis={1}
          />
        </div>
      </section>
    </>
  );
}
