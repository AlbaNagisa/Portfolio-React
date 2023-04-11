"use client";
import React, { useState } from "react";
import Container from "./components/container";
import Card from "./components/card";
import { useEffectOnce } from "usehooks-ts";
import { ThreeCircles } from "react-loader-spinner";

export default function Page() {
  type cardDataType = {
    id: string;
    title: string;
    body: string;
    images: string[];
  };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffectOnce(() => {
    setIsLoading(true);
    fetch("http://localhost:5050/api/projects/")
      .then((res) => res.json())
      .then((value) => {
        //setIsLoading(false);
        setData(value);
      });
  });

  const showCard = () => {
    if (isLoading) {
      return (
        <div className="spinner-container">
          <ThreeCircles
            height="100"
            width="100"
            color="#4f009e"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      );
    } else {
      return data.map((cardData: cardDataType) => {
        return (
          <Card
            key={cardData.id}
            title={cardData.title}
            images={cardData.images}
            desc={cardData.body}
          />
        );
      });
    }
  };
  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="flex min-h-[100%] mt-16 mr-26 ml-32 flex-col">
        <Container width="20%" height="10%" title="AlbaNagisa" />

        <div className="flex w-full h-fit mt-24">
          <div className=" flex flex-wrap min-h-screen justify-around w-[calc(100%-8rem)] ">
            {showCard()}
          </div>
        </div>
      </div>
    </div>
  );
}
