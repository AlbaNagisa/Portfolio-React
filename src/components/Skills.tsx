import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import Loading from "./Loading";
import { Tooltip } from "@mui/material";
import { Fade } from "react-awesome-reveal";

interface Props {
  title: string;
  placement: string;
}
enum Placement {
  top = "top",
  bottom = "bottom",
}
type DataType = {
  name: string;
  image: string;
  type: string;
};

export default function Skills(props: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<DataType[] | null>(null);
  useEffect(() => {
    fetch(
      `http://localhost:5050/api/skills/645e745819fe014f1c75c0da/${props.title}`
    )
      .then((res) => res.json())
      .then((value) => (setData(value), setIsLoaded(true)));
  }, [props.title]);
  if (!isLoaded || data === null) return <Loading />;
  return (
    <div className="flex flex-col justify-center items-center h-fit w-[40%]  pb-10">
      <Fade>
        <h1 className="text-white text-2xl pb-2">{props.title}</h1>
      </Fade>

      <div className="flex flex-row w-full justify-around items-center flex-wrap">
        {data.map((d, index) => (
          <Tilt
            key={index}
            options={{ max: 25 }}
            style={{ height: 125, width: 125, margin: 5 }}
          >
            <Fade className="flex w-full h-full justify-center items-center">
              <Tooltip
                className="flex  justify-center items-center"
                title={d.name}
                placement={props.placement as Placement}
              >
                <Image
                  className="self-center items-center flex w-full "
                  alt="image"
                  src={d.image}
                  width={125}
                  height={125}
                />
              </Tooltip>
            </Fade>
          </Tilt>
        ))}
      </div>
    </div>
  );
}
