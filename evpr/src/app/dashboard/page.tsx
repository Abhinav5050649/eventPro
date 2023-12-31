"use client";
import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import React from "react";
import DNav from "../DNav/page";

export default function ProfilePage(){
    const router = useRouter();
    
    const [data, setData] = React.useState({
        username: "",
        eventsParticipated: [],
    });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users/profile");
                setData({
                    username: response.data.username,
                    eventsParticipated: response.data.eventsParticipated,
                });

                console.log(response);
            } catch (error: any) {
                console.log(error.message)
            }
        };
    
        fetchData();
    }, []);

    //modify to properly display user details
    return(
        <>
        <DNav/>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl mb-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hello <span className="text-blue-600 dark:text-blue-500">{data.username}</span></h1>
                
                <h2 className="text-4xl mt-6 font-bold dark:text-white">Events Participated: </h2>
                {   
                    (data.eventsParticipated.length == 0) ? <h5 className="text-4xl mt-6 font-bold dark:text-white">None</h5> :
                    <ul>
                        {data.eventsParticipated.map((event: any) => (
                            <li key={event.eObjId}>
                                {/* <Link href={`/events/${event.eObjId}`}>
                                    <a>{event.ename}</a>
                                </Link> */}
                                <a href={`/events/view/:${event.eObjId}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{event.ename}</a> <br/>
                            </li>
                        ))}
                    </ul>
                }
                <hr/>
            </div>
        </>
    )
}