"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../components/container";
import Card from "../components/card";
import Loading from "@/components/Loading";
import Category from "@/components/Category";
import Typed from "typed.js";
import { Tilt } from "react-tilt";
import Switch from "react-switch";

export default function Page() {
  type cardDataType = {
    id: string;
    title: string;
    body: string;
    images: string[];
  };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const el = useRef<HTMLHeadingElement | null>(null);
  const elA = useRef<HTMLHeadingElement | null>(null);
  const [typed, setTyped] = useState<Typed | null>(null);
  const [isAnimation, setIsAnimation] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5050/api/projects/")
      .then((res) => res.json())
      .then((value) => {
        setIsLoading(false);
        setData(value);
      });
    const type = new Typed(el.current, {
      strings: [
        "Hey !",
        "Moi c'est Alban",
        `jeune développeur de 18 ans.`,
        `Actuellement étudiant à Lyon Ynov Campus.`,
        "Je suis à la recherche d'un stage" /*  pour renforcer mes compétences et acquérir une expérience professionnelle "*/,
        "N'hésitez pas à me contacter !",
      ],
      typeSpeed: 40,
      backSpeed: 30,
      smartBackspace: true,
      showCursor: true,
      loop: true,
    });
    setTyped(type);
    const t = new Typed(elA.current, {
      strings: ["Auto writing"],
      typeSpeed: 50,
      backSpeed: 100,
      smartBackspace: true,
      showCursor: false,
    });
    return () => (type?.destroy(), t?.destroy());
  }, []);

  const showCard = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return data.map((cardData: cardDataType) => {
        return (
          <Tilt
            options={{
              reverse: true,
              max: 35,
              perspective: 1000,
              scale: 1.1,
              speed: 3000,
              transition: true,
              axis: null,
              reset: true,
              easing: "cubic-bezier(.03,.98,.52,.99)",
            }}
            className="w-[25%] h-fit m-6 gap-6 rounded-3xl text-white flex flex-col shadow-[-20px_20px_0px_0px_rgba(0,0,0,0.25)]"
            key={cardData.id}
          >
            <Card
              title={cardData.title}
              images={cardData.images}
              desc={cardData.body}
              id={cardData.id}
            />
          </Tilt>
        );
      });
    }
  };

  const showAnimation = () => {
    if (!isAnimation && typed !== null) {
      typed.cursor.style.display = "none";
      typed.stop();
      return <></>;
    }
    if (typed !== null && isAnimation) {
      typed.cursor.style.display = "block";
      typed.start();
      return <></>;
    }
  };
  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="flex h-fit mt-16 ml-32 mr-32 w-auto flex-col">
        <div className="flex flex-row w-auto justify-between min-h-[10vh] items-center">
          <Container width="20%" height="100%" title="AlbaNagisa" />
          <div className="flex-row flex text-white">
            <h1 className=" text-xl mr-5" ref={elA}></h1>

            <Switch
              onChange={() => setIsAnimation(!isAnimation)}
              checked={isAnimation}
              onColor="#122675"
              offColor="#3d4b80"
              activeBoxShadow="true"
              uncheckedIcon={<div></div>}
              checkedIcon={<div></div>}
              className="shadow-[-7px_7px_3px_0px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
        <div className="flex flex-col  justify-center items-center h-fit mt-24">
          {/*  <Category name="A propos de moi" /> */}
          <div className="justify-center items-center flex flex-col w-[50%] text-white pb-10">
            <Category name="A propos de moi" />
            <h1
              style={{
                display: isAnimation ? "none" : "flex",
              }}
              className="w-full h-fit flex-col align-middle text-justify justify-center text-xl"
            >
              Hey, moi c&apos;est Alban et je suis un jeune développeur de 18
              ans ! Je suis passionné par le backend et je développe
              principalement en JavaScript en utilisant des frameworks tels que
              Next.js. En ce moment, je suis étudiant à Lyon Ynov Campus et je
              suis à la recherche d&apos;un stage pour renforcer mes compétences
              et acquérir une expérience professionnelle. N&apos;hésitez pas à
              me contacter ! Je serais ravi de discuter avec vous.
            </h1>
            <div
              style={{
                display: isAnimation ? "flex" : "none",
              }}
              className="w-full h-[3vh] flex-row align-middle text-justify justify-center"
            >
              <h1 className=" text-xl" ref={el}></h1>
            </div>
          </div>
          <Category name="Mes projets" />
          <div className="flex flex-wrap min-h-screen justify-around w-full">
            {showCard()}
          </div>
        </div>
      </div>
    </div>
  );
}
