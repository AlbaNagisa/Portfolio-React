"use client";
import React, { FC, useEffect, useState } from "react";
import GithubIcon from "@/public/github.svg";
import Image from "next/image";
import Link from "next/link";
import PieLanguages from "@/components/PieLanguages";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "@/components/Loading";
import BackArrow from "@/components/BackArrow";

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
  mobile: boolean;
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
      await fetch(`/api/projects/${params.id}`)
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
        <BackArrow />
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
              <div
                dangerouslySetInnerHTML={{ __html: `${data?.body}` }}
                className="flex flex-wrap text-xl w-[50%] text-justify text-white"
              ></div>
            </div>
            <div className="flex flex-row w-full mt-10">
              <div className="w-[50%] flex flex-col  items-center">
                <div className="w-[80%] flex flex-col justify-start items-start">
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
                  <div className="flex w-[70%]">{showPie()}</div>
                </div>
              </div>
              <div className="justify-center items-center flex flex-col w-[50%]">
                <div className=" flex justify-center items-center pb-5">
                  <Carousel
                    className={data?.mobile == true ? "w-[50%]" : "w-[100%]"}
                    showThumbs={false}
                    showArrows={true}
                    showStatus={false}
                    infiniteLoop={true}
                    autoPlay
                  >
                    {data?.images.map((image, index) => (
                      <div key={index} className="w-[100%]">
                        <Image
                          className={
                            data.mobile == true
                              ? "aspect-[9/16] object-cover"
                              : "aspect-[16/9] object-cover"
                          }
                          src={image}
                          alt="image"
                          height={data.mobile == true ? 2560 : 1080}
                          width={data.mobile == true ? 1440 : 1920}
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
