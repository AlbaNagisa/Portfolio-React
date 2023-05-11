import React from "react";
interface Props {
  name: string;
}
export default function Category(props: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-fit p-8">
      <h1 className="text-5xl text-white">{props.name}</h1>
    </div>
  );
}
