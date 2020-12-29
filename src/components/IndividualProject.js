import React from "react";
import { useProjectsValue } from "../context";

export default function IndividualProject({ setProjectInfo, setShowProjects }) {
  const { projects } = useProjectsValue();
  return (
    <div className="project-overlay">
      <div>
        {projects.map((project) => {
          return (
            <p
              className="individual-project"
              key={project.docId}
              onClick={() => {
                setProjectInfo(project.name, project.projectId);
                setShowProjects(false);
              }}
            >
              {project.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}
