"use client";
import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage(){
    const router = useRouter();
    
    const logout = async() => {
        try{
            const response = await axios.get("/api/users/logout");
            router.push("/");
        }catch(error: any){
            console.log(error.message)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <hr/>
            <button onClick={logout} className="bg-green-700 hover:bg-blue-900 mt-4 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}