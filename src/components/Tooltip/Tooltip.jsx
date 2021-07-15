import React, { useMemo, useRef, useState } from "react";
import "./Tooltip.css";

export function Tooltip(props) {
  const { children, title, scrolling, parentPosition } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const childrenRef = useRef(null);

  const cc = useMemo(() => {
    let measurements = {top: 0, left: 0};
    if (childrenRef && childrenRef.current) {
      const boundRect = childrenRef.current.getBoundingClientRect();
      measurements.left = boundRect.left + boundRect.width + 10;
      measurements.top = childrenRef.current.offsetTop - parentPosition;
    }
    return measurements;
  }, [childrenRef.current, parentPosition]);

  function handleMouseOver() {
    setShowTooltip(!showTooltip);
  }

  return (
    <>
      <div
        ref={childrenRef}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOver}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          top: cc.top,
          left: cc.left
        }}
        className={showTooltip && !scrolling ? "tooltip" : "hide-tooltip"}
      >
        {title}
      </div>
    </>
  );
}
