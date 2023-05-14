"use client";
import BackArrow from "@/components/BackArrow";
import Image from "next/image";
import React from "react";
import cv from "@/public/CV .png";

export default function Page() {
  return (
    <div className="h-screen w-full flex flex-col">
      <BackArrow />
      <div className="flex w-full h-full justify-center items-center pb-6">
        {/* <embed
          width="70%"
          height="100%"
          className="mb-6"
          src="/cv.pdf"
          type="application/pdf"
        /> */}
        <Image alt="cv" src={cv} width={600} height={600} />
      </div>
    </div>
  );
}
