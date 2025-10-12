import React from "react";
import Image from "next/image";

interface BlockProps {
  name: string;
  image?: string;
  link?: string;
  description?: string;
}

export default function Block({ name, image, description, link }: BlockProps) {
  return (
    <div
      className="md:w-[18rem] w-[10rem]  md:h-[50px] h-[40px] flex flex-row items-center text-white rounded-xl cursor-pointer text-center transition-all duration-300 gap-3  md:px-10 px-5 md:py-10 py-9  border-1 border-white/0 hover:border-white hover:bg-white/10"
      onClick={(e) => {
        if (link) {
          e.preventDefault();
          window.open(link, "_blank");
        }
      }}
    >
      <div className="flex flex-row md:items-center md:justify-start items-center justify-center w-full h-full gap-3">
        {image && (
          <div className="md:w-[50px] w-[25%] flex flex-col justify-center items-center ">
            <Image
              src={image}
              alt={name}
              width={0}
              height={0}
              sizes="100% 100%"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="w-fit flex flex-col rounded-xlitems-start text-left gap-3 ">
          <p className="md:text-2xl text-base font-bold">{name}</p>
          {/* <div className="w-full h-2 rounded-full border-1 border-white"></div> */}
          {/* <p className="text-md font-medium ">{description}</p> */}
        </div>
      </div>
    </div>
  );
}
