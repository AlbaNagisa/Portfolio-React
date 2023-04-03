import React from "react";
import Container from "./components/container";
import { data } from "../public/data.js";
import Card from "./components/card";

export default function page() {
  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="flex min-h-[100%] mt-16 mr-26 ml-32 flex-col">
        <Container width="20%" height="10%" title="AlbaNagisa" />
        <div className="flex w-full h-fit mt-24">
          <div className=" flex flex-wrap min-h-screen justify-around w-[calc(100%-8rem)]">
            {data.map((v) => {
              return (
                <Card
                  title={v.name}
                  desc={v["fr"].description}
                  key={v.id}
                  images={v.images}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
