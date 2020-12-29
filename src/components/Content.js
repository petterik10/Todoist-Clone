import React from "react";
import Tasks from "./Tasks";
import Today from "./Today";
import Inbox from "./Inbox";
import NextSevenDays from "./NextSevenDays";

export default function Content({
  activeProject,
  projectId,
  documentid,
  setActiveProject,
}) {
  return (
    <div className="content-container">
      {activeProject === "Today" ? (
        <Today />
      ) : activeProject === "Inbox" ? (
        <Inbox setActiveProject={setActiveProject} />
      ) : activeProject === "Next 7 days" ? (
        <NextSevenDays />
      ) : (
        <Tasks
          activeProject={activeProject}
          projectId={projectId}
          documentid={documentid}
          setActiveProject={setActiveProject}
        />
      )}
    </div>
  );
}
