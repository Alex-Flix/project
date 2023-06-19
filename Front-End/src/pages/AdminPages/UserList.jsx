import React, { useEffect, useState } from "react";
import imgDefault from "../../assets/img/01.jpg";
import { useSearchParams } from "react-router-dom";
import { getAllUsers, searchUser } from "../../api/apiData";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  confirmUserStatusChange,
  showUserDetails,
} from "../../Utils/userUtils";

import { PaginationControl } from "react-bootstrap-pagination-control";

export default function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const [userListSearch, setUserListSearch] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalSearchPages, setTotalSearchPages] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchName) {
      // setSearchParams(`name=${searchName}&&searchPage=3`);
      setSearchParams(`name=${searchName}`);
      searchUser(
        searchName,
        searchParams.get("searchPage") ? searchParams.get("searchPage") : 1
      ).then((data) => {
        if (data?.message) {
          setUserListSearch(data.data);
          setTotalSearchPages(data.totalPages);
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
    if (searchParams.get("searchPage")) {
      searchUser(
        searchParams.get("name"),
        searchParams.get("searchPage") ? searchParams.get("searchPage") : 1
      ).then((data) => {
        if (data?.message) setUserListSearch(data.data);
      });
    }
  }, [searchParams]);
  return (
    <>
      <section className="col-md-10 py-5 text-light">
        <h2 className="pb-2 ">User List</h2>
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
            <p className="lead col">Profile</p>
            <p className="lead col">Name</p>
            <p className="lead col">Contact</p>
            <p className="lead col text-center">Gender</p>
            <p className="lead col text-center">Age</p>
            <p className="lead col text-center">Favorites</p>
            <p className="lead col text-center">Status</p>
            <p className="lead col">Action</p>
          </article>
          {(userListSearch.length || userList.length) &&
            (userListSearch.length ? userListSearch : userList).map(
              (item, index) => (
                <article
                  className={
                    "row align-items-center col-lg-11 col-10 mx-auto p-lg-3 p-5 border border-1 list-hover " +
                    (index % 2 === 1 && "bg-blue-dark")
                  }
                  key={item._id}
                >
                  <div className="col-lg col-12 py-lg-0 py-3 row align-items-center">
                    <p className="lead d-lg-none d-block col-6">Profile</p>
                    <div className="col-lg col-6 w-25 ms-lg-0 ms-auto">
                      <img
                        src={
                          item?.profile_img?.secure_url
                            ? item.profile_img.secure_url
                            : imgDefault
                        }
                        alt="Profile"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Name</p>
                    <p className="col-lg col-6 text-lg-start text-end">
                      {item.firstName + " " + item.lastName}
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Contact</p>
                    <p className="col-lg col-6 text-lg-start text-end">
                      {item.phone}
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Gender</p>
                    <p className="col-lg col-6 text-lg-center text-end text-uppercase">
                      {item.gender}
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Age</p>
                    <p className="col-lg col-6 text-lg-center text-end ">
                      {item.age}
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Favorites</p>
                    <p className="col-lg col-6 h4 text-lg-center text-end">
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
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Status</p>
                    <p className="col-lg col-6 h4 text-lg-center text-end">
                      <span
                        className={
                          "badge  " + (item.status ? "bg-success" : "bg-danger")
                        }
                      >
                        {item.status ? "Active" : "Block"}
                      </span>
                    </p>
                  </div>
                  <div className="col-lg col-12 row">
                    <p className="lead d-lg-none d-block col-6">Action</p>
                    <p className="col-lg col-6 text-lg-start text-end">
                      <i
                        className="fa-solid fa-eye  me-2 p-2 bg-info rounded-2 cursor text-red "
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
        <div
          className="py-4 w-75 mx-auto"
          onClick={() => window.scrollTo(0, 0)}
        >
          <PaginationControl
            page={
              searchParams.get("name")
                ? +searchParams.get("searchPage")
                : searchParams.get("page")
                ? +searchParams.get("page")
                : 1
            }
            total={
              searchParams.get("name")
                ? totalSearchPages > 1
                  ? totalSearchPages
                  : 0
                : totalPages > 1
                ? totalPages
                : 0
            }
            limit={1}
            changePage={(page) => {
              searchParams.get("name")
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
