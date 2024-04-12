import React, { useEffect, useRef, useState } from "react";

const MyInput = ({
  width = 300,
  height = 12,
  paddingX = 0,
  paddingY = 0,
  value,
  onChange,
  thumbColor = "#000",
  trackColor = "#ccc",
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const track = useRef();

  const handleDown = (e) => {
    document.body.style.userSelect = "none";
    document.body.style.cursor = "pointer";
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  const handleUp = (e) => {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
    handleMove(e);
  };

  const handleMove = (e) => {
    document.body.style.cursor = "";
    const offsetLeft = track.current.getBoundingClientRect().x;
    const width_try = e.clientX - offsetLeft;
    let percentage = (100 / width) * width_try;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    onChange(percentage);
    setInternalValue(percentage);
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div
      style={{
        width: width + "px",
        height: height + "px",
        padding: `${paddingY}px ${paddingX}px`,
      }}
      className="myinput"
    >
      <div
        ref={track}
        onMouseDown={handleDown}
        className="myinput_track"
        style={{ backgroundColor: trackColor }}
      >
        <div
          style={{ width: internalValue + "%", backgroundColor: thumbColor }}
          className="myinput_thumb"
        ></div>
      </div>
    </div>
  );
};

export default MyInput;
