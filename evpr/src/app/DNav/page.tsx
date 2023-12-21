import React from "react";

export default function DNav() {
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <a className="flex-none text-2xl font-semibold dark:text-white" href="/dashboard"></a>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                <a className="font-medium text-2l text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/login" aria-current="page">Login</a>
                <a className="font-medium text-2l text-blue-500 hover:text-gray-400 dark:hover:text-gray-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/signup">Signup</a>
                </div>
            </nav>
        </header>
    );
}