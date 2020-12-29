import React, { useState } from "react";
import Overlay from "./Overlay";
import { db } from "../firebase";

export default function Inbox({ setActiveProject }) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [dateValue, setDateValue] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectid, setProjectId] = useState("");

  const receiveProjectInfo = (id, name) => {
    setProjectName(name);
    setProjectId(id);
  };

  const receiveDateInfo = (date) => {
    setDateValue(date);
  };

  const addNewTask = (taskName) => {
    db.collection("tasks")
      .add({
        archived: false,
        projectName: projectName,
        projectId: projectid,
        task: taskName,
        date: dateValue,
        userid: "123",
      })
      .then(() => {
        setActiveProject((prevState) => ({
          ...prevState,
          value: "Inbox",
        }));
      });
  };

  return (
    <div>
      <h2 className="content-header">Inbox</h2>
      <div
        className="sidebar__add__project"
        onClick={() => setShowAddTask(true)}
      >
        <div className="sidebat__add__dot">+</div>
        <div className="sidebar__add__text">Add Task</div>
      </div>
      {showAddTask && (
        <Overlay
          setDateInfo={receiveDateInfo}
          setProjectInfo={receiveProjectInfo}
          showDates={true}
          addTask={addNewTask}
          setShowAddTask={setShowAddTask}
          showToday={true}
        />
      )}
    </div>
  );
}
