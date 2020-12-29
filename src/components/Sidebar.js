import React from "react";

function Sidebar({ name, calender, selectedProject, activeProject }) {
  return (
    <li>
      <div
        className="sidebar__generic"
        data-testid="inbox-action"
        aria-label="Show inbox tasks"
        tabIndex={0}
        role="button"
        onClick={() => selectedProject(name)}
        style={{ backgroundColor: activeProject === name ? "white" : "" }}
      >
        <span>{calender}</span>
        <span className="sidebar__generic__item">{name}</span>
      </div>
    </li>
  );
}

export default Sidebar;
