import React, { useCallback, useEffect, useState } from "react";

export const useScrollHandler = <T extends HTMLElement>(
  scrollHeight: number,
  clientHeight: number,
  scrollHostRef: React.MutableRefObject<HTMLDivElement>,
) => {
  const [isDraggingThumb, setDraggingThumb] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = useCallback(
    (e: React.UIEvent<T, UIEvent>) => {
      setScrollPercentage(
        e.currentTarget.scrollTop / (scrollHeight - clientHeight),
      );
    },
    [scrollHeight, clientHeight],
  );

  const stopDrag = useCallback(() => setDraggingThumb(false), []);

  const beginDrag = useCallback(() => setDraggingThumb(true), []);

  const handleScrollBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const scrollBarClickTargetPercentage =
        e.nativeEvent.offsetY / clientHeight;
      const offsetDistanceModifier = Math.abs(
        scrollBarClickTargetPercentage - scrollPercentage,
      );
      const offset =
        (scrollBarClickTargetPercentage > scrollPercentage
          ? clientHeight
          : -clientHeight) * offsetDistanceModifier;
      if (scrollHostRef.current) {
        scrollHostRef.current.scrollBy({
          left: 0,
          top: offset,
          behavior: "smooth",
        });
      }
    },
    [scrollPercentage, clientHeight, scrollHeight, scrollHostRef.current],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const scrollPercentage = e.movementY / clientHeight;

      if (scrollHostRef.current) {
        scrollHostRef.current.scrollBy({
          left: 0,
          top: scrollPercentage * scrollHeight,
        });
      }
    };

    if (isDraggingThumb) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDrag);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDrag);
    };
  }, [isDraggingThumb, stopDrag, clientHeight, scrollHeight, scrollHostRef]);

  return {
    onScroll: handleScroll,
    onScrollBarClick: handleScrollBarClick,
    stopDrag,
    beginDrag,
    scrollPercentage,
    isDragging: isDraggingThumb,
  };
};
