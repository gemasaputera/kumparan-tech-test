import React from "react";
import { render } from "@testing-library/react";
import CollectionItem from "./index";

test("Should render", () => {
  const data = {
    title: "sample",
    body: "sample",
  };
  const { container } = render(<CollectionItem data={data} />);

  expect(container.querySelector("div.bg-white")).toBeInTheDocument();
});
