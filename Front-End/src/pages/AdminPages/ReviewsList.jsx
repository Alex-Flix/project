import React, { useEffect, useState } from "react";
import imgDefault from "../../assets/img/01.jpg";
import { getAllReviews } from "../../api/apiReview";
import { deleteReviewByAdmin } from "../../Utils/reviewUtils";

export default function ReviewsList() {
  const [reviewList, setReviewList] = useState([]);
  const deleteItem = (obj) => {
    deleteReviewByAdmin({ obj, reviewList, setReviewList });
  };
  useEffect(() => {
    getAllReviews().then((data) => {
      if (data?.message) setReviewList(data.data);
    });
  }, []);

  return (
    <>
      <section className="col-xl-10 py-5 text-light">
        <h2 className="pb-2 ">Review List</h2>
        {reviewList.length ? (
          <div className="row row-cols-1">
            <article className="table-header row d-xl-flex d-none px-xl-3 pb-4 pt-2 col-lg-11 mx-auto bg-blue-dark border border-1 border-bottom-0">
              <p className="lead col-2">Poster</p>
              <p className="lead col-2 text-center">User_Name</p>
              <p className="lead col-6 text-center">Content</p>
              <p className="lead col-1 text-center ms-xl-2">Action</p>
            </article>

            {reviewList.map((item, index) => (
              <article
                className={
                  "row align-items-center col-xl-11 col-10 mx-auto p-lg-3 p-5 border border-1 list-hover " +
                  (index % 2 === 1 && "bg-blue-dark")
                }
                key={item._id}
              >
                <div className="col-xl-2 col-12 py-xl-0 py-3 row align-items-center">
                  <p className="lead d-xl-none d-block col-6">Poster</p>
                  <div className="col-xl col-6 w-25 ms-xl-0 ms-auto text-xl-start text-end">
                    <img
                      src={
                        item?.movie_id?.poster
                          ? item.movie_id.poster
                          : imgDefault
                      }
                      alt="Profile"
                      className="col-xl-8 col-lg-6 col-12 rounded-3"
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-12 row">
                  <p className="lead d-xl-none d-block col-6">User_Name</p>
                  <p className="col-xl col-6 text-xl-center text-end">
                    {item.user_id.firstName + " " + item.user_id.lastName}
                  </p>
                </div>
                <div className="col-xl-6 col-12 row ">
                  <p className="lead d-xl-none d-block col-1">Content</p>
                  <p className="col-xl col-10 offset-xl-0 offset-1 text-xl-center text-end px-2 pt-1">
                    {item.content}
                  </p>
                </div>
                <div className="col-xl-1 col-12 row ">
                  <p className="lead d-xl-none d-block col-6">Action</p>
                  <p className="col-xl col-6 text-xl-center text-end d-flex flex-nowrap justify-content-xl-center justify-content-end">
                    <i
                      className="fa-solid fa-trash-can p-2  bg-danger rounded-2 text-red cursor"
                      onClick={() => deleteItem(item)}
                    ></i>
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
        </div>
        )}
      </section>
    </>
  );
}
