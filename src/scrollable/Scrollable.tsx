import React  from "react";

import "../styles/scrollable.sass";
import { ScrollableProps } from "./types/ScrollableProps";
import useResizeObserver from "use-resize-observer";
import { useScrollBarHeight } from "./hooks/useScrollBarHeight";

export const Scrollable = ({ children, ...props }: ScrollableProps) => {
  const {
    ref: containerRef,
    height: containerHeight,
  } = useResizeObserver();
  const {
    ref: scrollContentRef,
    height: scrollContentHeight,
  } = useResizeObserver();

  const scrollBarHeight = useScrollBarHeight(
    containerHeight,
    scrollContentHeight,
  );

  return (
    <div className="scrollable-container" {...props} ref={containerRef}>
      <div className="scroll-host">
        <div className="scroll-host-content" ref={scrollContentRef}>
          {children}
        </div>
      </div>
      <div className="scroll-bar">
        <div
          className="scroll-thumb"
          style={{ height: `${scrollBarHeight}px` }}
        />
      </div>
    </div>
  );
};
