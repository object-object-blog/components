import React from "react";

import "../styles/scrollable.sass";
import { ScrollableProps } from "./types/ScrollableProps";

export const Scrollable = ({ children, ...props }: ScrollableProps) => {
  return (
    <div {...props}>
			Hello world!
    </div>
  );
};
