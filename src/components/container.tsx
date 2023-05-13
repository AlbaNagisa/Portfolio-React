import React, { useState } from "react";

interface Props {
  title: string;
  height?: string;
  width?: string;
}

export default function Container(props: Props) {
  const [title, setTitle] = useState<string>(props.title);
  const [isTitle, setIsTitle] = useState<boolean>(false);

  return (
    <div
      style={{ width: props.width, minHeight: props.height }}
      className="flex select-none bg-gradient-to-b from-[#101b44ab] to-[#091543ab] min-w-fit max-h-[109px] rounded-3xl  items-center justify-center shadow-[-15px_15px_0px_0px_rgba(0,0,0,0.25)] p-3 cursor-pointer"
      onClick={() => {
        if (isTitle) return setTitle(props.title), setIsTitle(false);
        return setTitle("AlbaNagisa"), setIsTitle(true);
      }}
    >
      <h1 className=" flex break-all text-3xl text-white ">{title}</h1>
    </div>
  );
}
