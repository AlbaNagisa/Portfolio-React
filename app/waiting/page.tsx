"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useInterval } from "usehooks-ts";

export default function page() {
  const str = ["", ".", ". .", ". . ."];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [index, setIndex] = useState(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useInterval(() => {
    setIndex(index + 1);
    if (index === str.length - 1) {
      setIndex(0);
    }
  }, 500);

  function loadImage() {
    return "https://cdn.discordapp.com/attachments/898245359464243200/1091728917414559754/IMG_0154.png";
  }
  function loadImage2() {
    return "https://cdn.discordapp.com/attachments/898245359464243200/1091728916718293122/IMG_0153.gif";
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="flex flex-col-reverse w-full justify-center items-center gap-6">
        <div className="flex items-center justify-center text-3xl text-white">
          Coming soon {str[index]}
        </div>
        <div className="flex-row flex ">
          <div>
            <Image
              alt="Loading gif"
              src={loadImage2()}
              width={150}
              height={150}
            />
          </div>
          <div>
            <Image
              alt="Loading gif"
              src={loadImage()}
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
