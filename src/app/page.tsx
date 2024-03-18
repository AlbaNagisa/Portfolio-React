"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../components/container";
import Card from "../components/card";
import Loading from "@/components/Loading";
import Category from "@/components/Category";
import Typed from "typed.js";
import Switch from "react-switch";
import Image from "next/image";
import SmilingFace from "@/public/IMG_0256.png";
import { Fade } from "react-awesome-reveal";
import Skills from "@/components/Skills";
import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";
import GithubIcon from "@/public/github.svg";
import CVimg from "@/public/cv.png";
import Link from "next/link";
import Linkedin from "@/public/linkedin.png";

const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });

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
    fetch(`${process.env.API_URL}/api/projects`)
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
        "Je suis à la recherche d'une alternance" /*  pour renforcer mes compétences et acquérir une expérience professionnelle "*/,
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
          <Card
            key={cardData.id}
            title={cardData.title}
            images={cardData.images}
            desc={cardData.body}
            id={cardData.id}
          />
        );
      });
    }
  };
  const showAnimation = () => {
    if (isAnimation && typed !== null) {
      typed.cursor.style.display = "none";
      typed.stop();
      return;
    }
    if (typed !== null && !isAnimation) {
      typed.cursor.style.display = "block";
      typed.start();
      return;
    }
  };
  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="flex h-fit mt-16 ml-32 mr-32 w-auto flex-col">
        <div className="flex flex-row w-auto justify-between min-h-[10vh] items-center">
          <Container width="20%" height="100%" title="Alban Girardi" />
          <div className="flex flex-row items-center">
            <div className="mr-6 flex flex-row">
              <Link href="/cv" className="mr-2">
                <Image alt="cv" src={CVimg} width={45} height={45} />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/alban-girardi-8b1aa723a/"
                className="mr-2"
              >
                <Image alt="linkedin" src={Linkedin} width={45} height={45} />
              </Link>
              <Link target="_blank" href="https://github.com/albanagisa">
                <Image
                  alt="githubicon"
                  src={GithubIcon}
                  width={45}
                  height={45}
                />
              </Link>
            </div>
            <div className="flex-row flex text-white">
              <h1 className=" text-xl mr-5" ref={elA}></h1>
              <Switch
                onChange={(v) => (setIsAnimation(v), showAnimation())}
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
        </div>
        <div className="flex flex-col  justify-center items-center h-fit mt-24">
          <div className="justify-center items-center flex flex-col w-[50%] text-white pb-10">
            <Category name="A propos de moi" />
            <div className="flex flex-row items-center justify-start w-full">
              <div className="ml-10 h-full items-start">
                <Image
                  alt="myface"
                  src={SmilingFace}
                  width={250}
                  height={250}
                />
              </div>
              <h1
                style={{
                  display: isAnimation ? "none" : "flex",
                }}
                className="w-full h-fit flex-col align-middle text-justify justify-center text-xl ml-5"
              >
                Hey, moi c&apos;est Alban et je suis un jeune développeur de 18
                ans ! Je suis passionné par le backend et je développe
                principalement en JavaScript en utilisant des frameworks tels
                que Next.js. En ce moment, je suis étudiant à Lyon Ynov Campus
                et je suis à la recherche d&apos;une alternance pour renforcer
                mes compétences et acquérir une expérience professionnelle.
                N&apos;hésitez pas à me contacter ! Je serais ravi de discuter
                avec vous.
              </h1>
              <div
                style={{
                  display: isAnimation ? "flex" : "none",
                }}
                className="w-full h-[3vh] flex-row  text-justify ml-5 "
              >
                <h1 className=" text-xl" ref={el}></h1>
              </div>
            </div>
          </div>
          <>
            <Fade>
              <Category name="Mes compétences" />
            </Fade>
            <div className="flex flex-row justify-around w-full flex-wrap">
              <Skills title="Frontend" placement="bottom" />
              <Skills title="Backend" placement="bottom" />
              <Skills title="Database" placement="bottom" />
              <Skills title="Autre" placement="bottom" />
              <Skills title="Framework" placement="bottom" />
            </div>
          </>
          <>
            <Fade>
              <Category name="Mes expériences" />
            </Fade>

            <div
              style={{ width: "700px", height: "500px", marginBottom: "4%" }}
            >
              <Timeline />
            </div>
          </>
          <>
            <Fade>
              <Category name="Mes projets" />
            </Fade>
            <div className="flex flex-wrap h-fit justify-around w-full">
              {showCard()}
            </div>
          </>
          <>
            <Fade>
              <Category name="Me contacter" />
            </Fade>
            <div className="flex flex-col items-center justify-around w-full pb-60">
              <ContactForm />
            </div>
          </>
          <>
            <div className="text-white text-xs">
              © 2023 - Alban Girardi - Tous droits réservés
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
