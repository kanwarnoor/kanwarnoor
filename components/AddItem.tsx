import React from "react";

interface AddItemProps {
  name: string;
  closeItem: () => void;
}

export default function AddItem(Props: AddItemProps) {
  return (
    <div className="absolute z-50 w-full h-full bg-black/50  backdrop-blur-sm flex flex-col gap-5 items-center justify-center">
      <div
        className="absolute top-0 right-0 cursor-pointer hover:scale-110 duration-150 p-3"
        onClick={Props.closeItem}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold">Add {Props.name}</h1>
      <form className="flex flex-col gap-2  w-[20rem]">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded-md border-1 border-white/50"
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 rounded-md border-1 border-white/50"
        />
        <input
          type="text"
          placeholder="Image"
          className="w-full p-2 rounded-md border-1 border-white/50"
        />
        <input
          type="text"
          placeholder="Link"
          className="w-full p-2 rounded-md border-1 border-white/50"
        />
        <input
          type="text"
          placeholder="Tags"
          className="w-full p-2 rounded-md border-1 border-white/50"
        />
        <button
          type="submit"
          className="w-full p-2 rounded-md bg-white/10 border-1 border-white/50"
        >
          Add
        </button>
      </form>
    </div>
  );
}
