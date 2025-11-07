"use client";

import React , {useState} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InfoCard from "@/components/InfoCard";
import AddItem from "@/components/AddItem";

interface DashboardProps {
  logout: () => void;
}

export default function DashboardPage({ logout }: DashboardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await axios.get(`/api/admin/projects`)).data,
  });

  const [addProject, setAddProject] = useState(false);

  return (
    <div className="w-screen h-screen bg-back flex flex-col items-center justify-center overflow-hidden gap-3">
      <div
        className="absolute top-0 right-0 p-4 cursor-pointer"
        onClick={logout}
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
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold">Welcome Noor</h1>

      <div className="flex flex-col gap-4 w-full p-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Projects{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={() => {
              setAddProject(!addProject);
            }}
            className="size-7 cursor-pointer hover:scale-110 duration-150"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </h1>
        {isLoading && <div className="white-spinner w-7 h-7"></div>}
        {error && <p className="text-red-500">{error.message}</p>}
        {data &&
          data.map((project: any) => (
            <InfoCard
              key={project.id}
              title1={project.title}
              des={project.description}
              image={"/images/projects/remaster.webp"}
              link={project.link}
              animation={"center"}
            />
          ))}
      </div>




      {addProject && <AddItem  name="Project" closeItem={() => setAddProject(false)} />}
    </div>
  );
}
