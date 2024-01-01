"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DNav from "@/app/DNav/page";

interface Event {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  location: string;
  miscLinks: string;
}

export default function EventView({ params }: any) {
  const router = useRouter();
  const [data, setData] = useState<Event>({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    image: "",
    miscLinks: ""
  });

  const handleParticipation = async () => {
    await axios.put(`/api/events/participate/${params.id}`)
      .then((res) => {
        alert("Action Done!");
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        alert("Error Participating in Event!");
        router.push("/dashboard");
      })
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/events/one/${params.id}`);
      setData({
        name: response.data.data.name,
        description: response.data.data.description,
        startDate: new Date(response.data.data.startDate),
        endDate: new Date(response.data.data.endDate),
        location: response.data.data.location,
        image: response.data.data.image,
        miscLinks: response.data.data.miscLinks
      });
    };

    fetchData();

  }, [params.id]);

  return (
    <>
      <DNav />
      <div className="mx-auto max-w-sm rounded overflow-hidden shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl border bg-white text-black border-green-500 mt-4">
        <img className="w-full" src={data.image} alt="Event Image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.name}</div>
          <p className="text-gray-700 text-base">{data.description}</p>
          <div className="font-bold text-l mb-2">Duration: {formatDate(data.startDate)} to {formatDate(data.endDate)}</div>
          <div className="font-bold text-l mb-2">{data.location}</div>
          <p className="text-gray-700 text-base">Misc Links: {data.miscLinks}</p>
          {/* <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Views: {data.views}</span>
    </div> */}
          <a
            onClick={() => {
              handleParticipation();
            }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Participate
          </a>
          <p className="text-gray-700 text-base">(To not participate in the event, click again!)</p>
        </div>
      </div>

    </>
  );
}
