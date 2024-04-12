import React, { useRef } from "react";

const SlideWindow = ({ children }) => {
  const slc = useRef();

  const leftClick = () => {
    slc.current.scrollBy({ left: -440, behavior: "smooth" });
  };

  const rightClick = () => {
    slc.current.scrollBy({ left: 440, behavior: "smooth" });
  };

  return (
    <div className="slidewindow_wrapper">
      <div className="slidewindow">
        <div className="slide_btn_cont">
          <button onClick={leftClick} className="slide_left"></button>
        </div>
        <div ref={slc} className="slidewindow_content">
          {children}
        </div>
        <div className="slide_btn_cont">
          <button onClick={rightClick} className="slide_right"></button>
        </div>
      </div>
    </div>
  );
};

export default SlideWindow;
