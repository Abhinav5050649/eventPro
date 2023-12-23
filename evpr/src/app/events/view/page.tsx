"use client";
import React from "react";
import axios from "axios";
import router from "next/navigation";
import { useRouter } from "next/navigation";
import DNav from "@/app/DNav/page";

export default function eventDisplay() {
    const router = useRouter();

    const [name, setName] = React.useState("");

    const [data, setData] = React.useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        views: 0,
        image: "",
        miscLinks: "",
    })

    const handleSearch = async () => {
        try {
            const response = await axios.post(`/api/events/one`, { name });

            setData({
                name: response.data.name,
                description: response.data.description,
                startDate: response.data.startDate,
                endDate: response.data.endDate,
                views: response.data.views,
                image: response.data.image,
                miscLinks: response.data.miscLinks
            });

        } catch (error: any) {
            console.log(error.message)
        }
    }
    
    return (
        <>
            <DNav />
            <div className="mb-3">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon3" />

                    <button
                        className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                        type="button"
                        id="button-addon3" value={name} onChange={(e) => setName(e.currentTarget.value)} onClick={handleSearch}
                        data-te-ripple-init>
                        Search
                    </button>
                </div>
            </div>

            {(!data) ? <h5 className="text-4xl mt-6 font-bold dark:text-white">No Details Found!</h5> :
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src={data.image} alt="Event Image" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{data.name}</div>
                        <p className="text-gray-700 text-base">
                            {data.description}
                        </p>
                        <div className="font-bold text-l mb-2">Duration: {data.startDate} to {data.endDate}</div>
                        <p className="text-gray-700 text-base">
                            Misc Links: {data.miscLinks}
                        </p>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Views: {data.views}</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}