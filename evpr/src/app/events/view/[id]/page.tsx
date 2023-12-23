"use client";
import React from "react";
import axios from "axios";
import router from "next/navigation";
import { useRouter } from "next/navigation";
import DNav from "@/app/DNav/page";

export default function EventView(params: { id: String }) {
    const router = useRouter();
    const { id } = params;
    const [data, setData] = React.useState({
        name: "",
        description: "",
        startDate: Date.now(),
        endDate: Date.now(),
        views: 0,
        image: "",
        miscLinks: ""
    })

    React.useEffect(() => {
        try {
            axios.get(`/api/events/one/:${id}`)
                .then((res) => {
                    setData({
                        name: res.data.name,
                        description: res.data.description,
                        startDate: res.data.startDate,
                        endDate: res.data.endDate,
                        views: res.data.views,
                        image: res.data.image,
                        miscLinks: res.data.miscLinks
                    })
                })
                .catch((err) => {
                    console.log(err);
                })

        } catch (error: any) {
            console.log(error);
        }
    }, []);

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
                    <div className="font-bold text-l mb-2">Duration: {data.startDate} to {data.endDate}</div>
                    <p className="text-gray-700 text-base">
                        Misc Links: {data.miscLinks}
                    </p>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Views: {data.views}</span>
                    </div>
                </div>
            </div>
        </>
    );
}