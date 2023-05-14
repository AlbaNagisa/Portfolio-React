import Image from "next/image";
import Link from "next/link";
import BackArrowIcon from "@/public/back-arrow-icon.svg";
import React from "react";

export default function BackArrow() {
  return (
    <Link href="/" className="ml-5 mt-5 w-[10%] cursor-pointer">
      <div className="flex flex-row ">
        <Image
          src={BackArrowIcon}
          alt="backArrow"
          height={22}
          width={32}
          style={{ fill: "white" }}
        />
        <h1 className="text-white text-xl ml-4">Accueil</h1>
      </div>
    </Link>
  );
}
