"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DNav from "@/app/DNav/page";
import { ObjectId } from "mongoose";

interface Event {
  _id: string;
  name: string;
  description: string;
  image?: string;
}

export default function showEvents() {
  const [data, setData] = useState<Event[]>([]);
  const router = useRouter();

  const handleDelete: (eventId: String) => void = (eventId) => {
    axios.delete(`/api/events/delete/:${eventId}`)
    .then((res) => {
      router.push("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      alert("Error Deleting Event!")
      router.push("/dashboard");
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/events/user");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DNav />
      {data.map((event: Event) => (
        <div key={event._id} className="max-w-sm text-white bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href={`/events/view/:${event._id}`}>
            <img className="rounded-t-lg" src={event.image || process.env.DEFAULT_EVENT_IMG} alt="Event Image" />
          </a>
          <div className="p-5">
            <a href={`/events/view/:${event._id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
            <a href={`/events/view/:${event._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
            <a href={`/events/update/:${event._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Update
            </a>
            <a onClick={() => {handleDelete(event._id)}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
