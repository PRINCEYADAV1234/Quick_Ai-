import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import Card from "./Card";

const AiTools = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
        ASTRO<span className="text-indigo-500">.</span>
      </h2>

      <Cards />
    </section>
  );
};

export default AiTools;

const Cards = () => {
  const containerRef = useRef(null);

  const items = [
    {
      src: "https://plus.unsplash.com/premium_photo-1683842189051-19fc4188df7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2UlMjBpY29ufGVufDB8fDB8fHww",
      rotate: "6deg",
      top: "20%",
      left: "25%",
      className: "w-36 md:w-56",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
      rotate: "12deg",
      top: "45%",
      left: "60%",
      className: "w-24 md:w-48",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1666739388024-def5710e09a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVuY2lsJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      rotate: "-6deg",
      top: "20%",
      left: "40%",
      className: "w-52 md:w-80",
    },
    {
      src: "https://images.unsplash.com/photo-1698047681432-006d2449c631?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdW1lfGVufDB8fDB8fHww",
      rotate: "8deg",
      top: "50%",
      left: "40%",
      className: "w-48 md:w-72",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1700520223874-f7acf744d15d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Npc3NvciUyMGljb258ZW58MHx8MHx8fDA%3D",
      rotate: "18deg",
      top: "20%",
      left: "65%",
      className: "w-40 md:w-64",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1720857673605-5e3babc659b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXJhc2VyJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      rotate: "-3deg",
      top: "35%",
      left: "55%",
      className: "w-24 md:w-48",
    },
  ];

  return (

    <div className="absolute inset-0 z-10" ref={containerRef}>
      <h1 className="flex justify-center text-white text-4xl m-5"> Powerful AI Tools </h1>
      {items.map((item, i) => (
        <Card
          key={i}
          containerRef={containerRef}
          {...item}
          alt={`card-${i}`}
        />
      ))}
    </div>
  );
};
