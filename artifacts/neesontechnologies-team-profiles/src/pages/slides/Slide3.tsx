import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_3.jpg";
import img_2 from "./assets/images/image_4.png";
const Slide3: React.FC = () => {
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
  return <div id="slide-3" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-3" style={{
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
        left: "108.51px",
        top: "204.4px",
        width: "1382.99px",
        height: "1302.6px",
        boxSizing: "border-box",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        clipPath: "path('M 0 0 L 1382.99 0 L 1382.99 1302.6 L 0 1302.6 L 0 0 Z')",
        backgroundImage: `url(${img_1})`
      }} /><div key={1} style={{
        position: "absolute",
        left: "832px",
        top: "33.33px",
        width: "736px",
        height: "216.49px",
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
          }}>{"Dr Sonia Tikku Suresh"}</span><br /><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"Founder and Managing Director"}</span></p><p style={{
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
          }}>{"/in/"}</span><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"soniatikku"}</span><span style={{
            fontSize: "calc(32pt * var(--pptx-font-scale, 1))"
          }}>{"/"}</span></p></div><div key={2} style={{
        position: "absolute",
        left: "32px",
        top: "3.71px",
        width: "800.43px",
        height: "591.32px",
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
          }}>{"I have a bachelor's in chemical engineering from AC Tech Anna University Chennai, a masters from Drexel University, Philadelphia and a PhD in chemical engineering from IIT B, Mumbai.. I feel blessed that I was the recipient of the DST Woman Scientist Fellowship in 2004 and was one of the youngest scientists to receive this award. I did my PhD while working at IIT B as a scientist. Post my PhD I worked with UTCA (UBE Technical Centre (Asia) Limited),a Japanese petrochemical industry in Rayong, Thailand. On returning to India, I started freelancing as a consultant in advanced materials. I also conducted outreach programs in nano science and nanotechnology in schools for high school students. My work led me to founding my startups. I have a very clear vision of growing my consulting ventures to become global niche consulting companies. My mission is to bridge the gap between academia and industry in India and in the world. My motto in life is 'Live in the present moment, be grateful for what you have and be kind to everyone because you do not know what the other person is going through'. All we need to do is to be a little mindful, a little thoughtful and a little patient \uD83D\uDE0A"}</span><br /><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"On this note, "}</span><br /><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Signing off,"}</span><br /><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Dr. Sonia, "}</span><br /><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"A passionate 'nano-scientist'"}</span></p></div><img key={3} src={img_2} alt="Picture 5" style={{
        position: "absolute",
        left: "1079.77px",
        top: "645.33px",
        width: "449.98px",
        height: "268px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /></div></div>;
};
export default Slide3;
