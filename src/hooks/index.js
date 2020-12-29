import { db } from "../firebase";
import { useState, useEffect } from "react";

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
      const newLocal = "projectId";
      db.collection("projects")
        .where("userid", "==", "123")
        .orderBy(newLocal)
        .get()
        .then((snapshot) => {
          const allTheProjects = snapshot.docs.map((project) => ({
            ...project.data(),
            docId: project.id,
          }));
          if (JSON.stringify(allTheProjects) !== JSON.stringify(projects)) {
            setProjects(allTheProjects);
          }
        });
    }, [projects]);
    return { projects, setProjects };
  };