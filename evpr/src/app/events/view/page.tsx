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

            {(!data) ? <h5 className="text-4xl mt-6 font-bold dark:text-white">None</h5> :
                <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                    <img
                        alt="Home"
                        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="h-56 w-full rounded-md object-cover"
                    />

                    <div className="mt-2">
                        <dl>
                            <div>
                                <dt className="sr-only">Price</dt>

                                <dd className="text-sm text-gray-500">$240,000</dd>
                            </div>

                            <div>
                                <dt className="sr-only">Address</dt>

                                <dd className="font-medium">123 Wallaby Avenue, Park Road</dd>
                            </div>
                        </dl>

                        <div className="mt-6 flex items-center gap-8 text-xs">
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <svg
                                    className="h-4 w-4 text-indigo-700"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                    />
                                </svg>

                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500">Parking</p>

                                    <p className="font-medium">2 spaces</p>
                                </div>
                            </div>

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <svg
                                    className="h-4 w-4 text-indigo-700"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                </svg>

                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500">Bathroom</p>

                                    <p className="font-medium">2 rooms</p>
                                </div>
                            </div>

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <svg
                                    className="h-4 w-4 text-indigo-700"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>

                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500">Bedroom</p>

                                    <p className="font-medium">4 rooms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            }
        </>
    )
}