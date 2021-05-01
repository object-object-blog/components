import React from "react";

import "../styles/scrollable.sass";
import { ScrollableProps } from "./types/ScrollableProps";
import useResizeObserver from "use-resize-observer";
import { useScrollBarHeight } from "./hooks/useScrollBarHeight";
import { useScrollHandler } from "./hooks/useScrollHandler";

export const Scrollable = ({ children, ...props }: ScrollableProps) => {
  const { ref: containerRef, height: containerHeight } = useResizeObserver();
  const {
    ref: scrollContentRef,
    height: scrollContentHeight,
  } = useResizeObserver();

  const scrollBarHeight = useScrollBarHeight(
    containerHeight,
    scrollContentHeight,
  );

  const {
    onScroll,
    scrollPercentage,
  } = useScrollHandler<HTMLDivElement>(scrollContentHeight, containerHeight);

  return (
    <div className="scrollable-container" {...props} ref={containerRef}>
      <div className="scroll-host" onScroll={onScroll}>
        <div className="scroll-host-content" ref={scrollContentRef}>
          {children}
        </div>
      </div>
      <div className="scroll-bar">
        <div
          className="scroll-thumb"
          style={{
            height: `${scrollBarHeight}px`,
            top: `${scrollPercentage * (containerHeight - scrollBarHeight)}px`,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};
