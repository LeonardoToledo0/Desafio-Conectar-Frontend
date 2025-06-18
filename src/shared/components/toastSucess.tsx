
import React from "react";

interface ToastProps {
    message: string;
}

export const ToastSuccessfully: React.FC<ToastProps> = ({ message }) => (

    <div className="fixed top-4 right-4 z-50 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-700 shadow-lg dark:bg-green-800 dark:text-gray-300">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-white dark:bg-green-500 dark:text-green-200">
            <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M10 .5a9.5 9.5 0 101 0zM8.293 10.293l-2-2a1 1 0 111.414-1.414L9 8.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0z" />
            </svg>
            <span className="sr-only">Success icon</span>
        </div>

        <span className="ml-3 text-sm font-normal">{message}</span>
    </div>
);
