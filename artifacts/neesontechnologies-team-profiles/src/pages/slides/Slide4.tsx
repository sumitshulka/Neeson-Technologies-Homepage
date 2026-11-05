import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_5.png";
const Slide4: React.FC = () => {
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
  return <div id="slide-4" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-4" style={{
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
        top: "0px",
        width: "1600px",
        height: "1507px",
        boxSizing: "border-box",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        clipPath: "path('M 0 0 L 1600 0 L 1600 1507 L 0 1507 L 0 0 Z')",
        backgroundImage: `url(${img_1})`
      }} /><div key={1} style={{
        position: "absolute",
        left: "984px",
        top: "73.33px",
        width: "584px",
        height: "268.19px",
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
          }}>{"Mr"}</span><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{" Suresh Kumar S"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(32pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"Co-Founder and Director"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(32pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"\xA0"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(32pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"https://"}</span><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"www.linkedin.com"}</span><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"/in/suresh-kumar-s-0b052758/"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "32px",
        top: "3.71px",
        width: "800.43px",
        height: "504.07px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Teaching / R & D/ Training & Development/ School Management -A seasoned professional with 20 years of experience inclusive of nearly 9 years\u2019 of domestic & 15 years of overseas experience in Teaching, Training & Development and School Administration in Education sector. Proven track record of implementing operational policies/ norms, motivational schemes & education standards during the career span. Skilled in developing curriculum to accommodate different learning styles & maximizing students\u2019 comprehension. Experience of mentoring students by using interactive discussions and \u201Chands-on\u201D approach to help students learn and apply concepts in subjects."}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Holds distinction of attaining outstanding academic results for IGCSE students though interactive teaching and modern technology. Dedicated and self motivated leader with proficiency in handling the administrative activities entailing event management, faculty appraisal/training and upholding institutions motto. Recognized for outstanding organizational skills, creativity, parent-pupil relations and an ability to consistently exceed expectation. Possess stupendous skills for mentoring, guiding and controlling teachers/ students"}</span><br /><br /></p></div></div></div>;
};
export default Slide4;
