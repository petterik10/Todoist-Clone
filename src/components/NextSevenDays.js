import React, { useState, useEffect } from "react";
import moment from "moment";
import { db } from "../firebase";
import Overlay from "./Overlay";

function NextSevenDays() {
  const [nextDaysTasks, setNextDaysTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectid, setProjectId] = useState("");
  const [dateValue, setDateValue] = useState("");
  const todaysDate = moment().format("DD/MM/YYYY");

  useEffect(() => {
    let mounted = false;
    db.collection("tasks")
      .where("userid", "==", "123")
      .where("date", ">", todaysDate)
      .orderBy("date")
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const newTasks = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        if (
          JSON.stringify(newTasks) !== JSON.stringify(nextDaysTasks) &&
          !mounted
        ) {
          setNextDaysTasks(newTasks.filter((task) => task.archived !== true));
        }
      });

    return () => {
      mounted = true;
    };
  }, [nextDaysTasks, todaysDate]);

  const receiveDateInfo = (date) => {
    setDateValue(date);
  };

  const receiveProjectInfo = (id, name) => {
    setProjectId(id);
    setProjectName(name);
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
        setNextDaysTasks([...nextDaysTasks]);
      });
  };

  const deleteNextDaysTask = (id) => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        setNextDaysTasks([]);
      });
  };

  return (
    <div className="">
      <h2 className="content-header">Next Seven Days</h2>
      {nextDaysTasks.map((task) => {
        return (
          <div
            key={task.docId}
            className="checkbox-holder"
            onClick={() => deleteNextDaysTask(task.docId)}
          >
            <span className="checkbox"></span>
            <p>{task.task}</p>
            <p className="checkbox-holder-name">{task.projectName}</p>
          </div>
        );
      })}
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
          showToday={false}
          showProjects={true}
        />
      )}
    </div>
  );
}
export default NextSevenDays;
