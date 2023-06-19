import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./reviews.css";
export default function MovieReviews() {
  const [reviews, setReviews] = useState([
    { id: 1, user: "Salah", review: "و انت من اهله" },
    { id: 2, user: "Mohaned", review: "يقرف . امنع الكلام" },
    { id: 3, user: "Adel", review: "قضدرها حلوة" },
    { id: 4, user: "HAlawa", review: "عاش فشخ شغل عظيم" },
    { id: 5, user: "Samy", review: "طرششششششششششش" },
  ]);

  const [newReview, setNewReview] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(5);

  // useEffect(() => {
  //   .
  //   return () => {
  //     second
  //   }
  // }, [third])

  const handleViewMore = () => {
    setVisibleReviews(visibleReviews + 5);
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const handleUpdateReview = (id, updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, review: updatedReview, isEditing: false }
          : review
      )
    );
  };

  const handleAddReview = () => {
    if (newReview) {
      const review = {
        id: reviews.length + 1,
        user: "New User",
        review: newReview,
      };
      setReviews([...reviews, review]);
      setNewReview("");
    }
  };
  return (
    <div>
      <div id="reviews" className="mt-5">
        <h2 className="mb-4">Reviews</h2>
        <ul className="list-group">
          {reviews.slice(0, visibleReviews).map((review) => (
            <li key={review.id} className="list-group-item">
              <div className="d-flex align-items-start">
                <Avatar className="me-3">{review.user.charAt(0)}</Avatar>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 me-2">{review.user}</h5>
                  </div>
                  {review.isEditing ? (
                    <div className="d-flex mt-2">
                      <textarea
                        className="form-control me-2"
                        rows="2"
                        value={review.updatedReview || review.review}
                        onChange={(e) =>
                          setReviews((prevReviews) =>
                            prevReviews.map((prevReview) =>
                              prevReview.id === review.id
                                ? {
                                    ...prevReview,
                                    updatedReview: e.target.value,
                                  }
                                : prevReview
                            )
                          )
                        }
                      ></textarea>
                      <button
                        id="review-save-btn"
                        className="btn btn-sm fw-bold"
                        onClick={() =>
                          handleUpdateReview(review.id, review.updatedReview)
                        }
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="mt-2 mb-0">{review.review}</p>
                      <div className="review-btns mt-2">
                        <button
                          className="btn btn-link btn-sm"
                          onClick={() =>
                            setReviews((prevReviews) =>
                              prevReviews.map((prevReview) =>
                                prevReview.id === review.id
                                  ? { ...prevReview, isEditing: true }
                                  : prevReview
                              )
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-link btn-sm"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {visibleReviews < reviews.length && (
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={handleViewMore}>
              View More
            </button>
          </div>
        )}
      </div>

      <div id="add-review-container" className="container mt-5">
        <h2 className="text-center mb-4">Add Your Review</h2>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <button
              id="post-review"
              className="btn fw-bold"
              onClick={handleAddReview}
            >
              Post Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
