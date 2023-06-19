import { CardsSlider } from "../Streaming Components//Cards Slider Component/CardsSlider";
import { Nav } from "../Navbar Components/Nav component/Nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVids } from "../../store/Slice/videosSlice";
import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "./home.css";
export function Home() {
  const allVids = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  // const movies = { ...allVids }.movies;
  const movies = [...allVids.movies].sort((a, b) => b.rate - a.rate);
  const series = [...allVids.series].sort((a, b) => b.rate - a.rate);
  const animes = [...allVids.animes].sort((a, b) => b.rate - a.rate);
  console.log(movies);

  useEffect(() => {
    dispatch(fetchAllVids());
  }, []);

  //Loader till the data arrive
  if (allVids.length === 0)
    return (
      <h1 className="w-100 h-100 text-light d-flex justify-content-center align-items-center">
        Loading....
      </h1>
    );

  return (
    <>
      <Nav positionStyle={"position-fixed top-0 start-0"} />
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide d-flex justify-content-center align-items-center"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item vh-100 active">
            <img
              src="./images/cover1.jpg"
              className="d-block w-100 h-100"
              alt="..."
            />
          </div>
          <div className="carousel-item vh-100">
            <img
              src="./images/cover2.jpg"
              className="d-block w-100 h-100"
              alt="..."
            />
          </div>
        </div>
        <div className="text ms-5 position-absolute start-0 top-50">
          <h1 id="welcome-msg" className="text-capitalize">
            welcome to <span className="text-uppercase">alexflix</span>
          </h1>
          <p id="description" className="fs-4">
            Millions of movies, TV shows,Animes and thier wonderfull products
          </p>
        </div>
      </div>
      <CardsSlider movies={movies} title={"top movies"} />
      <CardsSlider movies={series} title={"top series"} />
      <CardsSlider movies={animes} title={"top animes"} />
    </>
  );
}
