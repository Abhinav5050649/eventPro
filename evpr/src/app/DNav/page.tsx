"use client";
import React from "react";
import axios from "axios";
import router from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function DNav() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const router = useRouter();

    const onLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            router.push("/");
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <header className="bg-white dark:bg-gray-900">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="sm:flex sm:gap-4">
                        <a
                            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                            href="/dashboard"
                        >
                            Dashboard
                        </a>

                        <a
                            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 sm:block"
                            onClick={onLogout}
                        >
                            Logout
                        </a>
                    </div>
                </div>

                <nav
                    aria-label="Global"
                    className={`${isMenuOpen ? 'block' : 'hidden'
                        } md:block md:items-center md:w-auto`}
                >
                    <ul className="flex flex-col md:flex-row items-center md:items-start gap-6 text-sm">
                        <li>
                            <a
                                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="/events/create"
                            >
                                Create Event
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="/events/all"
                            >
                                All Events
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                href="/events/user"
                            >
                                Your Events
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}