import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import "./MovieCard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../../store/Slice/favoritesSlice";
import { Button } from "react-bootstrap";
export function MovieCard({ movie, isFav }) {
  const [isFavorite, setIsFavorite] = useState(isFav);
  const dispatch = useDispatch();
  const addToFav = function (e) {
    e.stopPropagation();
    if (!isFavorite) {
      dispatch(addToFavorites(movie));
      setIsFavorite(true);
    } else {
      dispatch(deleteFromFavorites(movie));
      setIsFavorite(false);
    }
  };
  const navigate = useNavigate();
  const moveToDetails = function () {
    navigate(`/movies/${movie._id}`);
  };

  return (
    <div className="card p-0 m-2 mt-0 border-0 rounded-3 position-relative">
      <div className="img-container position-relative">
        <div className="card-overlay d-flex justify-content-center align-items-center rounded-3 position-absolute top-0 start-0 w-100 h-100 ">
          <div className="card-btns text-center">
            <Button
              onClick={addToFav}
              className="my-1"
              variant="outline-secondary"
            >
              <i className={`fa-solid fa-${isFavorite ? "check" : "plus"}`}></i>{" "}
              List
            </Button>
            <br />
            <Button
              onClick={moveToDetails}
              className="my-1"
              variant="outline-secondary"
            >
              Details
            </Button>
          </div>
        </div>
        <img
          src={movie.poster_image}
          className="card-img-top rounded-4"
          alt="..."
        />
      </div>
      <div className="card-body p-2">
        <h5 className="card-text text-center my-0">{movie.name}</h5>
      </div>
    </div>
  );
}
