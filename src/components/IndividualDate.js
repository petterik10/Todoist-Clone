import React from "react";
import moment from "moment";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from "react-icons/fa";

export default function IndividualDate({
  setDateValue,
  setShowIndividualDates,
  showToday,
}) {
  return (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        {showToday && (
          <li>
            <div
              className="date-container"
              tabIndex={0}
              aria-label="Select today as the task date"
              role="button"
              onClick={() => {
                setDateValue(moment().format("DD/MM/YYYY"));
                setShowIndividualDates(false);
              }}
            >
              <div className="date-icon">
                <FaSpaceShuttle />
              </div>
              <div className="date">Today</div>
            </div>
          </li>
        )}
        <li>
          <div
            className="date-container"
            role="button"
            tabIndex={0}
            aria-label="Select tomorrow as the task date"
            onClick={() => {
              setDateValue(moment().add(1, "day").format("DD/MM/YYYY"));
              setShowIndividualDates(false);
            }}
          >
            <div className="date-icon">
              <FaSun />
            </div>
            <div className="date">Tomorrow</div>
          </div>
        </li>
        <li>
          <div
            className="date-container"
            aria-label="Select next week as the task date"
            tabIndex={0}
            role="button"
            onClick={() => {
              setDateValue(moment().add(7, "days").format("DD/MM/YYYY"));
              setShowIndividualDates(false);
            }}
          >
            <div className="date-icon">
              <FaRegPaperPlane />
            </div>
            <div className="date">Next week</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
