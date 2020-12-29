import { useEffect, useState } from "react";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { db } from "../firebase";
import Overlay from "./Overlay";
import DeleteProject from "./DeleteProject";

export default function Tasks({
  activeProject,
  projectId,
  documentid,
  setActiveProject,
}) {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    let mounted = false;
    db.collection("tasks")
      .where("projectId", "==", projectId)
      .get()
      .then((snapshot) => {
        const allTheProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        if (
          JSON.stringify(allTheProjects) !== JSON.stringify(tasks) &&
          !mounted
        ) {
          setTasks(allTheProjects);
        }
      });

    return () => {
      mounted = true;
    };
  }, [projectId, tasks]);

  const receiveDateInfo = (date) => {
    setDateValue(date);
  };

  const addNewTask = (taskName) => {
    db.collection("tasks")
      .add({
        archived: false,
        projectName: activeProject,
        projectId: projectId,
        task: taskName,
        date: dateValue,
        userid: "123",
      })
      .then(() => {
        setTasks([...tasks]);
      });
  };

  const deleteTask = (id) => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        setTasks([]);
      });
  };

  return (
    <div>
      <h2 className="content-header"> {activeProject}</h2>
      {tasks.map((task) => {
        return (
          <div
            onClick={() => deleteTask(task.docId)}
            key={task.task}
            className="checkbox-holder"
          >
            <span className="checkbox"></span>
            <p>{task.task}</p>
          </div>
        );
      })}

      <div className="sidebar__add__project">
        <div className="sidebat__add__dot">+</div>
        <div
          onClick={() => setShowAddTask(true)}
          className="sidebar__add__text"
        >
          Add Task
        </div>
        <div className="delete-project">
          <FaTrashAlt onClick={() => setShowDelete(true)} className="" />
          <span className="delete-text">Delete this project</span>
        </div>
      </div>
      {showAddTask && (
        <Overlay
          setDateInfo={receiveDateInfo}
          showDates={true}
          addTask={addNewTask}
          setShowAddTask={setShowAddTask}
          showToday={true}
        />
      )}

      {showDelete && (
        <DeleteProject
          showProjects={false}
          setShowDelete={setShowDelete}
          documentid={documentid}
          setActiveProject={setActiveProject}
        />
      )}
    </div>
  );
}
