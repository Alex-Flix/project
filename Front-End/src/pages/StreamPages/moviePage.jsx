import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "react-tuby/css/main.css";
import { Player } from "react-tuby";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Reviews from "../../components/Streaming Components/Reviews Component/Reviews";
import { CardsSlider } from "../../components/Streaming Components//Cards Slider Component/CardsSlider";
import { getMovie } from "../../api/apiMovies";
import SeriesHandler from "../../components/Streaming Components/SeriesHandling/SeriesHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFav,
  removeFromList,
} from "../../store/Slice/videosSlice";
import { addToFavorites, deleteFromFavorites } from "../../api/apiStream";
import "../../components/Streaming Components/StreamPagesStyles/movie.css";
export default function MovieDetails() {
  const favLoader = useSelector((state) => state.favLoader);
  const [isFavorite, setIsFavorite] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const allVids = useSelector((state) => state.videos);
  const favorites = [...allVids.favorites];
  const dispatch = useDispatch();
  const [typing, setTyping] = useState(true);

  const params = useParams();
  const playerRef = useRef(null);
  useEffect(() => {
    getMoviedetails();
    if (favorites.length === 0) dispatch(getAllFav());
  }, []);

  useEffect(() => {
    let isMovieFav = favorites.find((obj) => obj.id === movieDetails._id);
    if (isMovieFav) setIsFavorite(true);
  }, [movieDetails, favorites]);
  async function getMoviedetails() {
    getMovie(params.id)
      .then((res) => {
        setMovieDetails(res.data);
        return res.data;
      })
      .then((movie) => {
        setProducts(movie.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addToFav = function (e) {
    e.stopPropagation();
    if (!isFavorite) {
      addToFavorites(movieDetails._id).then((res) => {
        setIsFavorite(true);
        //dispatch(addToList(movieDetails));
      });
    } else {
      deleteFromFavorites(movieDetails._id).then((res) => {
        setIsFavorite(false);
        dispatch(removeFromList(movieDetails));
      });
    }
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* <Modal.Header closeButton>welcome</Modal.Header> */}
          <Modal.Body>
            <div className="ratio ratio-16x9">
              <iframe
                closeButton
                src={`${movieDetails.trailer}?autoplay=1`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  return (
    <div
      id="movie-details-page"
      className="movie-details-container position-relative"
      style={{
        backgroundImage: `linear-gradient(rgba(8, 26, 54, 0.8), rgba(8, 26, 54, 0.8)) , url(${movieDetails.cover_image})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        onKeyDown={(e) => {
          if (e.key === " " && e.target.localName === "div") {
            setTyping(true);
          }
        }}
        tabIndex={0}
      >
        <div
          className="movie-card mb-3 cardDetails custom-card my-5"
          style={{ backgroundColor: "transparent" }}
        >
          <div className=" row g-0">
            <div
              id="poster-container"
              className="text-center text-lg-start col-lg-4 position-relative"
            >
              <img
                src={`${movieDetails.poster_image}`}
                className="img-fluid rounded-start w-100 "
                style={{ maxHeight: "90vh" }}
                alt="..."
              />
              <div
                className=" position-absolute top-0 end-0 m-3  "
                style={{ width: "15%", fontWeight: "bold" }}
              >
                <CircularProgressbar
                  value={Math.round(movieDetails.rate * 10) / 10}
                  maxValue={10}
                  text={`${Math.round(movieDetails.rate * 10) / 10 || 0}`}
                  background="true"
                  styles={buildStyles({
                    textSize: "2rem",
                    pathTransitionDuration: 0.5,
                    pathColor: `#00d0c5`,
                    textColor: "#00d0c5",
                    trailColor: "#d6d6d6",
                    backgroundColor: "rgba(8, 26, 54, 0.8)",
                  })}
                />
              </div>
            </div>
            <div id="movie-data-container" className="ps-3 col-lg-8">
              <div className="card-body">
                <h1 className="card-title p-3 text-center text-lg-start">
                  {movieDetails.name}
                </h1>
                <div style={{}} className=" py-2  p-3 my-2">
                  <div className="IconsInDetails-container">
                    {/* <Rating movie={movieDetails} /> */}
                    <div className="IconsInDetails text-center text-lg-start">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setModalShow(true)}
                        className="trailer-icon-container"
                      >
                        <i
                          className="fa-solid fa-play fa-2x fs-4 "
                          style={{
                            color: "#00d0c5",
                          }}
                        ></i>
                        <span
                          className=" text-capitalize"
                          style={{
                            fontSize: 20,
                            color: "#00d0c5",
                            paddingLeft: "0.23em",
                          }}
                        >
                          watch Trailer
                        </span>
                      </span>

                      <button
                        disabled={favLoader}
                        style={{ cursor: "pointer" }}
                        onClick={favLoader ? () => "" : addToFav}
                        className={`mx-4 fs-4 bg-transparent border-0 text-light`}
                        variant="outline-secondary"
                      >
                        <i
                          style={{ color: "gold" }}
                          className={`fa-${
                            favLoader
                              ? "spinner fa-spin fa-solid"
                              : isFavorite
                              ? "star fa-solid"
                              : "star fa-regular"
                          } `}
                        ></i>{" "}
                        List
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className=" p-3">Overview</h3>
                <p className="card-text p-3">{movieDetails.description}</p>
                <div>
                  <p className="card-text  p-3 py-2">
                    <small className="text-white-50">
                      <span className="text-white">Release date : </span>
                      {movieDetails.production_year}
                    </small>{" "}
                  </p>
                  {movieDetails.type !== "movie" && (
                    <SeriesHandler movieDetails={movieDetails} />
                  )}

                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" py-5">
            <Player
              keyboardShortcut={{
                pause: typing,
                forward: typing,
                rewind: typing,
                fullScreen: false,
                mute: typing,
                subtitle: typing,
              }}
              ref={playerRef}
              src={[
                {
                  quality: "Full HD",
                  url: "http://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/1080.mp4",
                },
                {
                  quality: 720,
                  url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/720.mp4",
                },
                {
                  quality: 480,
                  url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/480.mp4",
                },
              ]}
              poster={movieDetails.cover_image}
              controls
              fullScreenOnDoubleClick
            />
          </div>
        </div>{" "}
        {products.length > 0 && (
          <CardsSlider
            movies={products}
            title={"Related Products"}
            type={`product`}
          />
        )}
        <Reviews typing={typing} setTyping={setTyping} />
      </div>
    </div>
  );
}
