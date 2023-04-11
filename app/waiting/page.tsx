"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import loadingGif from "../../public/IMG_0153.gif";
import idleFace from "../../public/IMG_0154.png";

export default function Page() {
  const str = ["", ".", ". .", ". . ."];
  const [index, setIndex] = useState(0);
  useInterval(() => {
    setIndex(index + 1);
    if (index === str.length - 1) {
      setIndex(0);
    }
  }, 500);

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
              src={loadingGif}
              width={150}
              height={150}
            />
          </div>
          <div>
            <Image alt="Loading gif" src={idleFace} width={300} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
