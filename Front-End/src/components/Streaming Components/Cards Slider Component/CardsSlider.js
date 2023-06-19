import { MovieCard } from "../../Streaming Components/MovieCard component/MovieCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "./cardsSlider.css";

export function CardsSlider({ title, movies }) {
  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 2 },
  //   1024: { items: 3 },
  // };

  const items = movies.map((movie) => {
    return <MovieCard movie={movie} isFav={false} key={movie.id} />;
  });

  const Carousel = () => (
    <AliceCarousel
      infinite={true}
      autoPlay
      autoPlayInterval={5000}
      autoWidth
      disableDotsControls
      mouseTracking
      items={items}
      //responsive={responsive}
      controlsStrategy="alternate"
      renderPrevButton={() => {
        return <p className="m-0 p-0 fs-1 fw-bold ">&lang;</p>;
      }}
      renderNextButton={() => {
        return <p className="m-0 p-0 fs-1 fw-bold ">&rang;</p>;
      }}
    />
  );
  const handleDragStart = (e) => e.preventDefault();

  return (
    <div className="movie-slider my-4 px-5">
      <h2 className="title text-capitalize m-2 mb-4">{title}</h2>
      {Carousel()}
    </div>
  );
}
