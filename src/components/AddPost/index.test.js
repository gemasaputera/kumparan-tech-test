import React from "react";
import { render } from "@testing-library/react";
import AddPost from "./index";

test("Should render", () => {
  const { container } = render(<AddPost></AddPost>);

  expect(container.querySelector("div.bg-white")).toBeInTheDocument();
});
