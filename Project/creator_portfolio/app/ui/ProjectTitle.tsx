import React from "react";
import { IProjectTitle } from "../type/Types";

function ProjectTitle({ children }: IProjectTitle) {
  return <h1 className="text-xl font-sans font-bold mb-5">{children}</h1>;
}

export default ProjectTitle;
