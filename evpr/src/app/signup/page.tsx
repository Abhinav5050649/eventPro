"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        secpass: "",
        username: "",
        organization: false,
    });

    const onSignup = async() => {
        try {
            // if (user.password !== user.secpass) {
            //     alert("Passwords do not match!");
            // }
            // else {
                const response = await axios.post("/api/users/signup", user);
                console.log("Signup success", response.data);
                router.push("/login");
           // }
        } catch (error: any) {
            console.log("Signup failed", error.message)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="lg:grid min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 bg-orange-700">
                    {/* <img
                        alt="Pattern"
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    /> */}
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-4xl font-bold" href="/">
                            EventPro
                        </a>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-orange-500 sm:text-3xl md:text-4xl">
                            Welcome
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                            Fill out these details to get started!
                        </p>

                        <div className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Username
                                </label>

                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={user.username}
                                    onChange={(e) => setUser({...user, username: e.target.value})}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    value={user.email}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="PasswordConfirmation"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Password Confirmation
                                </label>

                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="password_confirmation"
                                    value={user.secpass}
                                    onChange={(e) => setUser({...user, secpass: e.target.value})}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>
                            
                            <div className="col-span-6">
                                <label htmlFor="OrgBool" className="flex gap-4">
                                <input
                                    type="checkbox"
                                    id="OrgBool"
                                    name="OrgBool"
                                    onClick={(e) => setUser({...user, organization: true})}
                                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                                />

                                <span className="text-sm text-white">
                                    Are you an Organization?
                                </span>
                                </label>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                                    onClick={onSignup}
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                    Already have an account? <a href="/login" className="text-gray-700 underline dark:text-gray-200"> Log in</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}