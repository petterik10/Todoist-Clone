import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import IndividualProject from "./IndividualProject";
import IndividualDate from "./IndividualDate";

export default function Overlay({
  setProjectInfo,
  showDates,
  setDateInfo,
  addTask,
  setShowAddTask,
  showToday,
  showProjects,
}) {
  const [showProject, setShowProjects] = useState(false);
  const [showIndividualDates, setShowIndividualDates] = useState(false);
  const [taskName, setTaskName] = useState("");

  const receiveProjectInfo = (id, name) => {
    setProjectInfo(name, id);
  };

  const receiveDateInfo = (info) => {
    setDateInfo(info);
  };

  return (
    <div className="overlay">
      <div className="add">
        <div className="add__input">
          <input
            value={taskName}
            className="add-task__name"
            type="text"
            placeholder="Name your task"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="task-container">
            <div className="add-task-container">
              <button
                className="add__submit"
                type="button"
                onClick={() => {
                  addTask(taskName);
                  setTaskName("");
                  setShowAddTask(false);
                }}
              >
                Add Task
              </button>
              <span
                aria-label="Cancel adding task"
                className="add__cancel"
                role="button"
                tabIndex={0}
                onClick={() => setShowAddTask(false)}
              >
                Cancel
              </span>
            </div>
            <div className="icon-container">
              <span
                className="add-task__date"
                tabIndex={0}
                role="button"
                onClick={() => setShowProjects(true)}
              >
                {showProjects && <FaRegCalendarAlt />}
              </span>
              {showDates && (
                <FaRegListAlt onClick={() => setShowIndividualDates(true)} />
              )}
              {showDates && showIndividualDates && (
                <IndividualDate
                  setDateValue={receiveDateInfo}
                  setShowIndividualDates={setShowIndividualDates}
                  showToday={showToday}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showProject && (
        <IndividualProject
          setProjectInfo={receiveProjectInfo}
          setShowProjects={setShowProjects}
        />
      )}
    </div>
  );
}
