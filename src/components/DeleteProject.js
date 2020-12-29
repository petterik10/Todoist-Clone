import React from "react";
import { db } from "../firebase";
import { useProjectsValue } from "../context";

export default function DeleteProject({
  setShowDelete,
  documentid,
  setActiveProject,
}) {
  const { projects, setProjects } = useProjectsValue();
  const deleteThisProject = (id) => {
    db.collection("projects")
      .doc(id)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setActiveProject((prevState) => ({
          ...prevState,
          value: "Inbox",
        }));
        setShowDelete(false);
      });
  };
  return (
    <div className="project-delete-modal">
      <div className="project-delete-modal__inner">
        <p>Are you sure you want to delete this project?</p>
        <button
          onClick={() => deleteThisProject(documentid)}
          className="delete-button"
          type="button"
        >
          Delete
        </button>
        <span
          tabIndex={0}
          role="button"
          aria-label="Cancel adding project, do not delete"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </span>
      </div>
    </div>
  );
}
