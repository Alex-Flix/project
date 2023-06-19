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
      <section className="col-md-10 py-5 text-light">
        <h2 className="pb-2 ">Review List</h2>
        <div className="row row-cols-1">
          <article className="table-header row d-lg-flex d-none px-lg-3 pb-4 pt-2 col-lg-11 mx-auto bg-blue-dark border border-1 border-bottom-0">
            <p className="lead col-2">Poster</p>
            <p className="lead col-2 text-center">User_Name</p>
            <p className="lead col-6 text-center">Content</p>
            <p className="lead col-1 ms-4">Action</p>
          </article>
          {reviewList.length &&
            reviewList.map((item, index) => (
              <article
                className={
                  "row align-items-center col-lg-11 col-10 mx-auto p-lg-3 p-5 border border-1 list-hover " +
                  (index % 2 === 1 && "bg-blue-dark")
                }
                key={item._id}
              >
                <div className="col-lg-2 col-12 py-lg-0 py-3 row align-items-center">
                  <p className="lead d-lg-none d-block col-6">Poster</p>
                  <div className="col-lg col-6 w-25 ms-lg-0 ms-auto">
                    <img
                      src={
                        item?.movie_id?.poster
                          ? item.movie_id.poster
                          : imgDefault
                      }
                      alt="Profile"
                      className="w-100 rounded-3"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-12 row">
                  <p className="lead d-lg-none d-block col-6">User_Name</p>
                  <p className="col-lg col-6 text-lg-center text-end">
                    {item.user_id.firstName + " " + item.user_id.lastName}
                  </p>
                </div>
                <div className="col-lg-6 col-12 row ">
                  <p className="lead d-lg-none d-block col-1">Content</p>
                  <p className="col-lg col-10 offset-lg-0 offset-1 text-lg-center text-end px-2 pt-1">
                    {item.content}
                  </p>
                </div>
                <div className="col-lg-1 col-12 row ">
                  <p className="lead d-lg-none d-block col-6">Action</p>
                  <p className="col-lg col-6 text-lg-start text-end">
                    <i
                      className="fa-solid fa-trash-can p-2  bg-danger rounded-2 text-red cursor"
                      onClick={() => deleteItem(item)}
                    ></i>
                  </p>
                </div>
              </article>
            ))}
        </div>
      </section>
    </>
  );
}
