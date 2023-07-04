import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./SeriesHandle.css";

const SeriesHandler = ({ movieDetails }) => {
  const navigate = useNavigate();
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const moveToDetails = (season, episode) => {
    navigate(`/movies/${movieDetails._id}?season=${season}episode=${episode}`);
    setSelectedEpisode(`${season}-${episode}`);
  };

  const getEpisodeClassName = (season, episode) => {
    if (`${season}-${episode}` === selectedEpisode) {
      return "list-group-item list-group-item-action occordionList selected";
    } else {
      return "list-group-item list-group-item-action occordionList";
    }
  };

  return (
    <div>
      <div className="accordion accordion-flush" id="accordionFlush">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed  occordionOnFocus"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Season 1
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse "
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="list-group">
                <p
                  className={getEpisodeClassName(1, 1)}
                  style={{ cursor: "pointer" }}
                  onClick={() => moveToDetails(1, 1)}
                >
                  Episode 1
                </p>
                <p
                  className={getEpisodeClassName(1, 2)}
                  style={{ cursor: "pointer" }}
                  onClick={() => moveToDetails(1, 2)}
                >
                  Episode 2
                </p>
                <p
                  className={getEpisodeClassName(1, 3)}
                  style={{ cursor: "pointer" }}
                  onClick={() => moveToDetails(1, 3)}
                >
                  Episode 3
                </p>
                <p
                  className={getEpisodeClassName(1, 4)}
                  style={{ cursor: "pointer" }}
                  onClick={() => moveToDetails(1, 4)}
                >
                  Episode 4
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed  occordionOnFocus"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Season 2
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="list-group">
                <p
                  className={getEpisodeClassName(2, 1)}
                  onClick={() => moveToDetails(2, 1)}
                  style={{ cursor: "pointer" }}
                >
                  Episode 1
                </p>
                <p
                  className={getEpisodeClassName(2, 2)}
                  onClick={() => moveToDetails(2, 2)}
                  style={{ cursor: "pointer" }}
                >
                  Episode 2
                </p>
                <p
                  className={getEpisodeClassName(2, 3)}
                  onClick={() => moveToDetails(2, 3)}
                  style={{ cursor: "pointer" }}
                >
                  Episode 3
                </p>
                <p
                  className={getEpisodeClassName(2, 4)}
                  onClick={() => moveToDetails(2, 4)}
                  style={{ cursor: "pointer" }}
                >
                  Episode 4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesHandler;
