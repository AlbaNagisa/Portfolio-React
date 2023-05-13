import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { Tilt } from "react-tilt";

interface Props {
  title: string;
  desc: string;
  images: string[];
  id: string;
}

export default function Card(props: Props) {
  function slice(str: string) {
    return str.slice(0, 60) + "...";
  }

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
      style={{
        background: `linear-gradient(208.84deg, rgba(9, 21, 67, 0.5) 17.75%, #101B44 74.01%)`,
      }}
      className="w-[25%] h-fit m-6 gap-6 rounded-3xl text-white flex flex-col shadow-[-20px_20px_0px_0px_rgba(0,0,0,0.25)]"
    >
      <Fade>
        <Link href={"/project/" + props.id} id="card" className="rounded-3xl">
          <div id="image">
            <Image
              alt="img"
              className="aspect-[16/9] rounded-t-3xl"
              src={props.images[0]}
              width={1920}
              height={1080}
            />
          </div>
          <div className="flex flex-col p-4 gap-4">
            <div id="title" className="flex flex-col text-center">
              <h1 className="text-2xl font-bold ">{props.title}</h1>
            </div>
            <div id="desc" className="flex flex-col text-center break-all">
              <h1 className="text-2xs pl-4 pr-4">
                {props.desc.length > 60 ? slice(props.desc) : props.desc}
              </h1>
            </div>
          </div>
        </Link>
      </Fade>
    </Tilt>
  );
}
