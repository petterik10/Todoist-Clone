import React, { useState, useRef } from "react";
import { useProjectsValue } from "../context";
import { db } from "../firebase";
import { generatePushId } from "../helpers";

export default function Projects({ selectedProject }) {
  const { projects, setProjects } = useProjectsValue();
  const [addProduct, setAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const projectId = generatePushId();
  const buttonRef = useRef();

  const addNewProduct = () => {
    buttonRef.current.classList.add("pressed");
    setTimeout(() => {
      buttonRef.current.classList.remove("pressed");
    }, 100);
    newProduct &&
      db
        .collection("projects")
        .add({
          projectId,
          name: newProduct,
          userid: "123",
        })
        .then(() => {
          setProjects([]);
          setNewProduct("");
          setAddProduct(false);
        });
  };

  return (
    <div className="sidebar__dot">
      {projects.map((project) => {
        return (
          <li
            className="sidebar__project"
            key={project.docId}
            onClick={() =>
              selectedProject(project.name, project.projectId, project.docId)
            }
          >
            {project.name}
          </li>
        );
      })}

      {!addProduct && (
        <div
          className="sidebar__add__project"
          onClick={() => setAddProduct(true)}
        >
          <div className="sidebat__add__dot">+</div>
          <div className="sidebar__add__text">Add a project</div>
        </div>
      )}
      {addProduct && (
        <div className="add-project" data-testid="add-project">
          <div className="ad" data-testid="add-project-inner">
            <input
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className="add__name"
              data-testid="project-name"
              type="text"
              placeholder="Name your project"
            />
            <button
              onClick={addNewProduct}
              ref={buttonRef}
              className="add__submit"
              type="button"
            >
              Add Project
            </button>
            <span
              onClick={() => setAddProduct(false)}
              aria-label="Cancel adding project"
              className="add-project__cancel"
              role="button"
              tabIndex={0}
            >
              Cancel
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
