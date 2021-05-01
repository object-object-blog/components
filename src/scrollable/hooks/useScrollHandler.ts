import React, { useCallback, useState } from "react";

export const useScrollHandler = <T extends HTMLElement>(
  scrollHeight: number,
  clientHeight: number,
) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = useCallback(
    (e: React.UIEvent<T, UIEvent>) => {
      setScrollPercentage(
        e.currentTarget.scrollTop / (scrollHeight - clientHeight),
      );
    },
    [scrollHeight, clientHeight],
  );

  return {
    onScroll: handleScroll,
    scrollPercentage,
  };
};
