"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DNav from "@/app/DNav/page";

interface Event {
  _id: string;
  name: string;
  description: string;
  image?: string;
}

export default function ShowEvents() {
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/events/all");
        setData(response.data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DNav />
      <div className="flex flex-col items-center min-h-screen">
        {data.length === 0 ? (
          <h5 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white mb-4">No events</h5>
        ) : (
          data.map((event: Event) => (
            <div key={event._id} className="max-w-sm text-black bg-white border border-green-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mt-4">
              <a href={`/events/view/:${event._id}`}>
                <img className="rounded-t-lg w-full" src={event.image || process.env.DEFAULT_EVENT_IMG} alt="Event Image" />
              </a>
              <div className="p-5">
                <a href={`/events/view/:${event._id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
                <a href={`/events/view/:${event._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
