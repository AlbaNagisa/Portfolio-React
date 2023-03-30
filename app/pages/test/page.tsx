"use client";
import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

export default function page() {
  useEffect(() => {
    anime({
      targets: "#id",
      translateY: {
        value: -document.body.clientHeight - 1,
      },
      rotate: "1turn",
      duration: 1500,
      loop: false,
      easing: "easeInSine",
      delay: 1000,
    });
  }, []);

  return (
    <div className="h-full w-full flex">
      <div
        id="id"
        className="w-10 h-10 bg-red-300 top-full left-[50%] absolute"
      ></div>
    </div>
  );
}
