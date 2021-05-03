import React, { useRef } from "react";

import "../styles/scrollable.sass";
import { ScrollableProps } from "./types/ScrollableProps";
import useResizeObserver from "use-resize-observer";
import { useScrollBarHeight } from "./hooks/useScrollBarHeight";
import { useScrollHandler } from "./hooks/useScrollHandler";

export const Scrollable = ({ children, ...props }: ScrollableProps) => {
  const scrollHostRef = useRef<HTMLDivElement>();
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
		onScrollBarClick,
    beginDrag,
    stopDrag,
    scrollPercentage,
    isDragging,
  } = useScrollHandler<HTMLDivElement>(
    scrollContentHeight,
    containerHeight,
    scrollHostRef,
  );

  return (
    <div
      className="scrollable-container"
      {...props}
      onMouseUp={stopDrag}
      ref={containerRef}
    >
      <div className="scroll-host" onScroll={onScroll} ref={scrollHostRef}>
        <div className="scroll-host-content" ref={scrollContentRef}>
          {children}
        </div>
      </div>
      <div className="scroll-bar" onClick={onScrollBarClick}>
        <div
          className={`scroll-thumb${isDragging ? " dragged" : ""}`}
          style={{
            height: `${scrollBarHeight}px`,
            top: `${scrollPercentage * (containerHeight - scrollBarHeight)}px`,
          }}
          onMouseDown={beginDrag}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};
