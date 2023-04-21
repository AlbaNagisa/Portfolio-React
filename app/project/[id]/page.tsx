"use client";
import React, { FC, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useEffectOnce } from "usehooks-ts";

interface pageProps {
  params: {
    id: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffectOnce(() => {
    setIsLoading(true);
    fetch(`http://localhost:5050/api/projects/${params.id}`)
      .then((res) => res.json())
      .then((value) => {
        setIsLoading(false);
        setData(value);
      })
      .catch((err) => {
        setIsError(true);
      });
    if (typeof data == "string" || isError || data.length == 0) {
      throw new Error("Something went wrong");
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
  };
  return (
    <div className="flex h-screen w-screen flex-col ">{showDetails()}</div>
  );
};

export default Page;
