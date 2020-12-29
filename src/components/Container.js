import React, { useState } from "react";
import SideBar from "./Sidebar";
import Content from "./Content";
import Projects from "./Projects";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";

export default function Container() {
  const [activeProject, setActiveProject] = useState({
    value: "Inbox",
    projectId: "",
    docid: "",
  });

  const [showProjects, setShowProjects] = useState(true);

  const receiveProject = (item, id, documentId) => {
    setActiveProject({
      projectId: id,
      value: item,
      docid: documentId,
    });
  };

  return (
    <div className="wrap-container">
      <div className="sidebar">
        <ul className="sidebar-container">
          <SideBar
            name="Inbox"
            calender={<FaInbox />}
            selectedProject={receiveProject}
            activeProject={activeProject.value}
          />
          <SideBar
            name="Today"
            calender={<FaRegCalendar />}
            selectedProject={receiveProject}
            activeProject={activeProject.value}
          />
          <SideBar
            name="Next 7 days"
            calender={<FaRegCalendarAlt />}
            selectedProject={receiveProject}
            activeProject={activeProject.value}
          />
        </ul>
        <div
          className="sidebar__middle"
          onClick={() => setShowProjects(!showProjects)}
        >
          <span>
            <FaChevronDown
              className={showProjects ? "show-projects" : undefined}
            />
          </span>
          <span className="sidebar__generic__item">Projects</span>
        </div>
        {!showProjects && <Projects selectedProject={receiveProject} />}
      </div>
      <Content
        activeProject={activeProject.value}
        projectId={activeProject.projectId}
        documentid={activeProject.docid}
        setActiveProject={setActiveProject}
      />
    </div>
  );
}
