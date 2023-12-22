"use client";
import React from "react";
import axios from "axios";
import router from "next/navigation";
import { useRouter } from "next/navigation";
import DNav from "@/app/DNav/page";

export default function eventForm() {

    const router = useRouter();

    const sendToDashboard = () => {
        router.push("/dashboard");
    }

    const handleRegisteration = async () => {
        //define function to integrate with backend
    }

    return (
        <>
            <DNav />
            <div className="min-h-screen bg-dark py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">e</div>
                                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed">Create an Event</h2>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Title</label>
                                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" required/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Description</label>
                                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event Description" required/>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <label className="leading-loose">Start</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020" required/>
                                                    <div className="absolute left-3 top-2">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="leading-loose">End</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="26/02/2020" required/>
                                                    <div className="absolute left-3 top-2">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Location</label>
                                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="If online, mention online. Else, mention the complete location!"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Image URL</label>
                                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Optional"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Miscellaneous Links: </label>
                                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Optional"/>
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button onClick={sendToDashboard} className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                                    </button>
                                    <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}