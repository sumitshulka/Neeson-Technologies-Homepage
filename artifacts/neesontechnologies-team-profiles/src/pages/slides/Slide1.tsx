import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
const Slide1: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({
    s: 1,
    x: 0,
    y: 0
  });
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / 1600, h / 1506.67);
      setLayout({
        s,
        x: (w - 1600 * s) / 2,
        y: (h - 1506.67 * s) / 2
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return <div id="slide-1" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-1" style={{
      position: "absolute",
      width: "1600px",
      height: "1506.67px",
      overflow: "hidden",
      transformOrigin: "top left",
      color: "#000000",
      backgroundColor: "#ffffff",
      transform: `scale(${layout.s})`,
      left: layout.x + "px",
      top: layout.y + "px"
    }}><div key={0} style={{
        position: "absolute",
        left: "0px",
        top: "286.43px",
        width: "1526.83px",
        height: "1220.57px",
        boxSizing: "border-box",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        clipPath: "path('M 0 0 L 1526.83 0 L 1526.83 1220.57 L 0 1220.57 L 0 0 Z')",
        backgroundImage: `url(${img_1})`
      }} /><div key={1} style={{
        position: "absolute",
        left: "864px",
        top: "73.33px",
        width: "704px",
        height: "113.09px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(32pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"Late Dr V K Tikku"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(32pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"Visionary behind Neeson Technologies"}</span></p></div></div></div>;
};
export default Slide1;
