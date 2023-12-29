"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";  // Use correct import for useRouter
import DNav from "@/app/DNav/page";
import { ObjectId } from "mongoose";

interface Event {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  views: number;
  image: string;
  miscLinks: string;
}

export default function EventView({params}: any) {
  const router = useRouter();
  const { id } = params;
  const [data, setData] = useState<Event>({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    views: 0,
    image: "",
    miscLinks: ""
  });

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/events/one/${id}`);
      setData({
        name: response.data.data.name,
        description: response.data.data.description,
        startDate: new Date(response.data.data.startDate),
        endDate: new Date(response.data.data.endDate),
        views: response.data.data.views,
        image: response.data.data.image,
        miscLinks: response.data.data.miscLinks
      });
    };

    fetchData();
  }, [id]);

  return (
    <>
      <DNav />
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={data.image} alt="Event Image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.name}</div>
          <p className="text-gray-700 text-base">
            {data.description}
          </p>
          <div className="font-bold text-l mb-2">Duration: {formatDate(data.startDate)} to {formatDate(data.endDate)}</div>
          <p className="text-gray-700 text-base">
            Misc Links: {data.miscLinks}
          </p>
          {/* <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Views: {data.views}</span>
          </div> */}
        </div>
      </div>
    </>
  );
}
