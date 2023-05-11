"use client";
import React, { FC, useEffect, useState } from "react";
import BackArrowIcon from "../../../public/back-arrow-icon.svg";
import GithubIcon from "../../../public/iconmonstr-github-1.svg";
import Image from "next/image";
import Link from "next/link";

import PieLanguages from "@/components/PieLanguages";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "@/components/Loading";

interface pageProps {
  params: {
    id: string;
  };
}

interface dataT {
  code?: number;
  message?: string;
  title: string;
  body: string;
  images: string[];
  technologies: string[];
  github: Github;
}
type Github = {
  url: string;
  repoName: string;
};
const Page: FC<pageProps> = ({ params }) => {
  const [data, setData] = useState<dataT | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function onLoad() {
      await fetch(`http://localhost:5050/api/projects/${params.id}`)
        .then((res) => res.json())
        .then(async (value) => {
          setData(value);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(true);
    onLoad();
  }, [params.id]);
  const showPie = () => {
    if (data != undefined && data.github != undefined)
      return (
        <PieLanguages owner="AlbaNagisa" repoName={data?.github.repoName} />
      );
  };
  const showDetails = () => {
    if (isLoading) {
      return <Loading />;
    }

    //  top left of my page i want Go Back clickable div
    return (
      <div className="flex flex-col h-full w-full">
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
        <div className="flex flex-wrap w-full justify-center mt-10 mb-10">
          <h1 className="flex flex-wrap text-5xl text-white">{data?.title}</h1>
        </div>
        <div className="flex flex-col h-fit w-[auto] items-center pb-20 ">
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(9, 21, 67, 0.5) 48.1%, #101B44 146.43%)",
            }}
            className="flex flex-col w-[75%] h-[100%] rounded-3xl shadow-[-25px_25px_0px_0px_rgba(0,0,0,0.25)] p-10 gap-10"
          >
            <div className="flex flex-wrap items-center justify-center w-full">
              <h1 className="flex flex-wrap text-xl w-[50%] text-justify text-white">
                {data?.body}
              </h1>
            </div>
            <div className="flex flex-row w-full justify-around ">
              <div className="w-[50%]">
                <h1 className="text-white text-xl pb-5">
                  Technologies utilisées
                </h1>
                <ul className="list-none">
                  {data?.technologies.map((tech, index) => (
                    <li
                      key={index}
                      className="flex flex-row text-white text-xl font-bold"
                    >
                      · {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">{showPie()}</div>
              </div>
              <div className="justify-center items-center flex flex-col w-full ml-60">
                <div className="pb-5">
                  <Carousel
                    showThumbs={false}
                    showArrows={true}
                    showStatus={false}
                    infiniteLoop={true}
                    autoPlay
                  >
                    {data?.images.map((image, index) => (
                      <div key={index}>
                        <Image
                          src={image}
                          alt="image"
                          height={500}
                          width={500}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <Link target="_blank" href={data?.github.url ?? "/error"}>
                  <Image src={GithubIcon} alt="github" height={50} width={50} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (data?.code === 404) {
    throw new Error("Not found");
  }
  return <div className="flex h-fit w-screen flex-col ">{showDetails()}</div>;
};

export default Page;
