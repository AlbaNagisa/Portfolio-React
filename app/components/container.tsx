import React from "react";

interface Props {
  title: string;
  height?: string;
  width?: string;
}

export default function Container(props: Props) {
  return (
    <div
      style={{ width: props.width, minHeight: props.height }}
      className="flex bg-gradient-to-b from-[#101b44ab] to-[#091543ab] min-w-fit max-h-[109px] rounded-2xl  items-center justify-center shadow-[-26px_26px_15px_-5px_rgba(0,0,0,0.1)] p-3"
    >
      <h1 className=" flex break-all text-3xl text-white ">{props.title}</h1>
    </div>
  );
}
