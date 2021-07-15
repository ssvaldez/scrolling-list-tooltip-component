import "./App.css";
import { Tooltip } from "./components/Tooltip/Tooltip";
import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function App() {
  const [scrolling, setScrolling] = useState(false);
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);
  const scrollingTimer = useRef();

  const onScroll = useCallback(() => {
    setPosition(containerRef.current.scrollTop)
    setScrolling(true);
    clearTimeout(scrollingTimer.current);
    scrollingTimer.current = setTimeout(() => setScrolling(false), 200);
  }, [scrollingTimer]);

  const removeScrollListener = useCallback(() => {
      if (containerRef.current) {
          clearTimeout(scrollingTimer.current);
          containerRef.current.removeEventListener('scroll', onScroll);
      }
  }, [scrollingTimer, onScroll, containerRef]);

  useEffect(() => {
      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', onScroll);
      }
      return () => {
          removeScrollListener();
      };
  }, [onScroll, removeScrollListener, containerRef]);

  return (
    <div className="App">
      <div ref={containerRef} className="container">
        {[...Array(26).keys()].map((index) => (
          <Tooltip
            parentPosition={position}
            scrolling={scrolling}
            key={`anchor+${index}`}
            title={`tooltip-${index}`}
          >
            <div className="anchor">Anchor {index} </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
