import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProjectsProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
