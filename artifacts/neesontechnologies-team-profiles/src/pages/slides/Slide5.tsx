import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_6.jpg";
const Slide5: React.FC = () => {
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
  return <div id="slide-5" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-5" style={{
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
        left: "232px",
        top: "329.33px",
        width: "1208px",
        height: "1177.33px",
        boxSizing: "border-box",
        overflow: "hidden"
      }}><img src={img_1} alt="Picture 1" style={{
          position: "absolute",
          left: "-24.33px",
          top: "0px",
          width: "1232.33px",
          height: "1206.32px",
          maxWidth: "none"
        }} /></div><div key={1} style={{
        position: "absolute",
        left: "928px",
        top: "73.33px",
        width: "640px",
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
          }}>{"Dr K C Mittal"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(32pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"Advisor"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "32px",
        top: "3.71px",
        width: "800.43px",
        height: "474.99px",
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
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"Dr K.C Mittal did his "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"M.Sc"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{" (Hons) in Physics  from Punjab University Chandigarh in 1974 and was selected for BARC Training School in the same year. He joined as Scientific Officer in Plasma Physics Division of BARC in 1975. He completed his "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"Ph.D"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{" from Bombay University in 1986. The topic of his thesis was, \u201CGeneration of intense impulse gigawatt electron beam in vacuum and gas filled diodes\u201D.  During 89 to 91 he worked as a postdoctoral fellow at Cornell university USA and at University of  New Mexico Albuquerque, USA. He worked as Invited Professor at University of PARIS 6 during September 91.  He was again invited at Ecole Polytechnique "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"Pallasseau"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{" during 2007."}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"\xA0"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"His field of research has been High Power DC, RF and impulse electron beam generation and its application in research, industry and "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"defence"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{". His team has developed several  DC and RF electron accelerators  from  500 keV to 10 MeV and up to 30 kW beam power. Many industrial applications like cross linking have been "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"demonstated"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{" . Pulse power systems have been employed for HPM and Flash X ray applications"}</span></p></div></div></div>;
};
export default Slide5;
