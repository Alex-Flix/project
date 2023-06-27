import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./SeriesHandle.css";

const SeriesHandler = ({ movieDetails }) => {
  const navigate = useNavigate();
  const moveToDetails = (season, episode) => {
    navigate(`/movies/${movieDetails._id}?season=${season}episode=${episode}`);
  };

  return (
    <div>
      <div className="accordion accordion-flush" id="accordionFlush">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed occordionList occordionOnFocus"
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
                  className="list-group-item list-group-item-action active occordionList"
                  style={{ cursor: "pointer" }}
                  onClick={() => moveToDetails(1, 1)}
                >
                  Episode 1
                </p>
                <p
                  className="list-group-item list-group-item-action occordionList"
                  style={{ cursor: "pointer" }}
                  onClick={() => moveToDetails(1, 2)}
                >
                  Episode 2
                </p>
                <p
                  className="list-group-item list-group-item-action occordionList"
                  style={{ cursor: "pointer" }}
                  onClick={() => moveToDetails(1, 3)}
                >
                  Episode 3
                </p>
                <p
                  className="list-group-item list-group-item-action occordionList"
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
              className="accordion-button collapsed occordionList occordionOnFocus"
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
                  onClick={() => moveToDetails(2, 1)}
                  className="list-group-item list-group-item-action active occordionList"
                  aria-current="true"
                  style={{ cursor: "pointer" }}
                >
                  Episode 1
                </p>
                <p
                  onClick={() => moveToDetails(2, 2)}
                  className="list-group-item list-group-item-action occordionList"
                  style={{ cursor: "pointer" }}
                >
                  Episode 2
                </p>
                <p
                  onClick={() => moveToDetails(2, 3)}
                  className="list-group-item list-group-item-action occordionList"
                  style={{ cursor: "pointer" }}
                >
                  Episode 3
                </p>
                <p
                  onClick={() => moveToDetails(2, 4)}
                  className="list-group-item list-group-item-action occordionList"
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
