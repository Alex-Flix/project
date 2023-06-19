import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../Rating Component/Rating";
import Modal from "react-bootstrap/Modal";
import "react-tuby/css/main.css"
import { Player } from "react-tuby";
import Reviews from "../Reviews Component/Reviews";
import "./movie.css"

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const params = useParams();
  const playerRef = useRef(null);
  useEffect(() => {
    axios
      .get(`https://project-pjo4l2v44-alex-flix.vercel.app/movies/${params.id}`)
      .then((res) => setMovieDetails(res.data.data))
      .catch((err) => console.log(err));
  }, []);

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
                src="https://www.youtube.com/embed/qEVUtrk8_B4?autoplay=1"
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

  const handleEnterFullScreen = () => {
    console.log(movieDetails);
    const player = playerRef.current;
    if (player) {
      player.fsAPI.enter();
    }
  };

  return (
    <div
    className="movie-details-container"
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
      <div className=" container">
        <div
          className="movie-card mb-3 cardDetails custom-card my-5"
          style={{ backgroundColor: "transparent" }}
        >
          <div  className=" row g-0">
            <div id="poster-container" className="text-center text-lg-start col-lg-4">
              <img
                src={`${movieDetails.poster_image}`}
                className="img-fluid rounded-start h-100"
                alt="..."
              />
            </div>
            <div id="movie-data-container" className="ps-3 col-lg-8">
              <div className="card-body">
                <h1 className="card-title p-3 text-center text-lg-start">{movieDetails.name}</h1>
                <div className=" py-2  p-3 my-2">
                  <div className="IconsInDetails-container">
                    {/* <Rating movie={movieDetails} /> */}
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setModalShow(true)}
                      className="IconsInDetails text-center text-lg-start"
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
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* video player */}
        <div className=" my-5 w- 75   mx-auto ">
          <div className="  ">
            {" "}
            <Player
              ref={playerRef}
              src={[
                {
                  quality: "Full HD",
                  url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
              // subtitles={[
              //   {
              //     lang: "en",
              //     language: "English",
              //     url: "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/en.vtt",
              //   },
              //   {
              //     lang: "fr",
              //     language: "French",
              //     url: "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/fr.vtt",
              //   },
              // ]}
              // dimensions={{ width: "80 vw", height: "50 vh" }}
              poster={movieDetails.cover_image}
              // controls
              // keyboard
              fullScreenOnDoubleClick
              onEnterFullScreen={handleEnterFullScreen}
            />
          </div>
        </div>{" "}
        <Reviews />
      </div>
    </div>
  );
}
