import React from "react";
import Image from "next/image";
import profilePic from "../public/IMG_0143.png";

export default function page() {
  return (
    <div className="w-full h-full flex">
      <Image
        src={profilePic}
        alt="image"
        className="w-full h-full object-cover aspect-[16:9]"
      />
    </div>
  );
}
