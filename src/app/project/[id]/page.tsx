"use client";
import React, { FC, useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import BackArrowIcon from "../../../public/back-arrow-icon.svg";
import Image from "next/image";
import Link from "next/link";

import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "skylight v1",
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
  const [githubData, setGithubData] = useState<void | OctokitResponse<
    { [key: string]: number | undefined },
    200
  >>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function onLoad() {
      await octokit
        .request("GET /repos/{owner}/{repo}/languages", {
          owner: "AlbaNagisa",
          repo: "anemyapp",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
        .then((res) => setGithubData(res))
        .catch((err) => console.log(err));
      await fetch(`http://localhost:5050/api/projects/${params.id}`)
        .then((res) => res.json())
        .then((value) => {
          setIsLoading(false);
          setData(value);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(true);
    onLoad();
  }, [params.id]);

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
          <h1></h1>
        </div>
      </div>
    );
  };
  if (data?.code === 404) {
    throw new Error("Not found");
  }
  return (
    <div className="flex h-screen w-screen flex-col ">{showDetails()}</div>
  );
};

export default Page;
