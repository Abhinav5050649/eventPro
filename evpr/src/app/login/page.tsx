"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {
        try {
            console.log("login mein hu");
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/dashboard");
        } catch (error: any) {
            console.log("login failed", error.message)
        }
    }

    return (
        <section className="min-h-screen flex items-stretch text-white">
            <div className="lg:flex w-1/2 hidden bg-black bg-no-repeat bg-cover relative items-center">
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide text-white">Keep it Simple and Fun!</h1>
                    <p className="text-3xl my-4 text-white">Make your events the talk of the town!</p>
                </div>
            </div>
            {/* style={{backgroundColor: "#161616"}} */}
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-orange-700" >
                <div className="w-full py-6 z-20">
                    <h1 className="my-6">
                        <a href="/"className="text-5xl font-bold tracking-wide text-gray-100 hover:text-gray-300">EventPro</a>
                    </h1>
                    <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input className="block w-full p-4 text-lg rounded-sm bg-black" type="password" name="password" id="password" placeholder="Password"/>
                        </div>
                        <div className="px-4 pb-2 pt-4">
                            <button className="uppercase block w-full p-4 text-lg rounded-full bg-blue-600  focus:outline-none">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}