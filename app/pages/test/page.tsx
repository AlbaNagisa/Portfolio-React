"use client";
import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Image from "next/image";
import rocket from "../../../public/rocket.svg";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    anime({
      targets: "#rocket",
      translateY:
        -document.body.clientHeight -
        Number(document.getElementById("rocket")?.offsetHeight),
      rotate: "0turn",
      duration: 1500,
      loop: false,
      easing: "easeInSine",
      delay: 1000,
    }).finished.then(() => {
      document.getElementById("rocket")?.remove();
    });
  }, []);

  return (
    <div className="h-full w-full flex">
      <div id="id" className="w-10 h-10 bg-red-300  absolute"></div>
      <Image
        alt="rocket"
        id="rocket"
        className="top-full left-[50%] absolute"
        src={rocket}
        width={300}
      />
    </div>
  );
}
