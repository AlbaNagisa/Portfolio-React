"use client";
import React, { FC, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useEffectOnce } from "usehooks-ts";
import BackArrowIcon from "../../../public/back-arrow-icon.svg";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

interface pageProps {
  params: {
    id: string;
  };
}

interface dataT {
  code?: number;
  message?: string;
  title: string;
  description: string;
  images: string[];
}

const Page: FC<pageProps> = ({ params }) => {
  const [data, setData] = useState<dataT | null>(null);
  const [githubData, setGithubData] = useState<null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffectOnce(() => {
    setIsLoading(true);
    fetch(`http://localhost:5050/api/projects/${params.id}`)
      .then((res) => res.json())
      .then((value) => {
        setIsLoading(false);
        setData(value);
      })
      .catch((err) => {
        console.log(err);
      });
    if (data?.code === 404) {
      throw new Error("Not found");
    }
  });

  const showDetails = () => {
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
            <h1 className="text-[white] text-xl ml-4">Accueil</h1>
          </div>
        </Link>
        <div className="flex flex-col h-[auto] w-[auto] items-center justify-center">
          salut
        </div>
      </div>
    );
  };
  return (
    <div className="flex h-screen w-screen flex-col ">{showDetails()}</div>
  );
};

export default Page;
