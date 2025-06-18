
import React from "react";
import type { LayoutProps } from "../types/layout.types";
import { Sidebar } from "./sidebar";

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-gray-50 pt-20 px-4 overflow-y-auto sm:ml-64">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                {children}
            </main>
        </div>
    );
};
