import React, { useState, useEffect } from "react";
import moment from "moment";
import { db } from "../firebase";
import Overlay from "./Overlay";

export default function Today() {
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectid, setProjectId] = useState("");
  const todaysDate = moment().format("DD/MM/YYYY");


  useEffect(() => {
    let mounted = false;
    db.collection("tasks")
      .where("userid", "==", "123")
      .where("date", "==", todaysDate)
      .get()
      .then((snapshot) => {
        const newTasks = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        if (
          JSON.stringify(newTasks) !== JSON.stringify(todaysTasks) &&
          !mounted
        ) {
          setTodaysTasks(newTasks.filter((task) => task.archived !== true));
        }
      });

    return () => {
      mounted = true;
    };
  }, [todaysTasks, todaysDate]);

  const deleteTodaysTask = (id) => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        setTodaysTasks([...todaysTasks]);
      });
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
        date: todaysDate,
        userid: "123",
      })
      .then(() => {
        setTodaysTasks([...todaysTasks]);
      });
  };

  return (
    <div className="">
      <h2 className="content-header">Today</h2>
      {todaysTasks.map((task) => {
        return (
          <div
            onClick={() => deleteTodaysTask(task.docId)}
            key={task.docId}
            className="checkbox-holder"
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
          addTask={addNewTask}
          setProjectInfo={receiveProjectInfo}
          showDates={false}
          setShowAddTask={setShowAddTask}
          showProjects={true}
        />
      )}
    </div>
  );
}
