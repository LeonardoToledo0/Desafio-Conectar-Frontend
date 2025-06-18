import React, { useEffect, useMemo, useState } from "react";
import { getMenuItemsByRole } from "../constants/menuItems";
import { getUser } from "../service/user.service";
import { Avatar } from "./avatar";
import { useLogout } from "../hooks/userLogout";
import { Link, useNavigate } from "react-router-dom";

interface User {
    name: string;
    id: number;
    email: string;
    lastLoginAt: string;
    role: string;
    status: boolean;
    updatedAt: string;
}
export const Sidebar: React.FC = () => {

    const logout = useLogout();
    const navigate = useNavigate();
    const userRole = localStorage.getItem("role") || "user";
    const [user, setUser] = useState<User | null>(null);
    const menuItems = useMemo(() => {
        const items = getMenuItemsByRole(userRole, logout);


        return items.map(item => {
            if (item.label.toLowerCase().includes("sair")) {
                return {
                    ...item,
                    onClick: (e: React.MouseEvent) => {
                        e.preventDefault();
                        logout();
                        navigate("/");
                    }
                };
            }
            return item;
        });
    }, [userRole, logout, navigate]);
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser()
            setUser(user);
        };

        fetchUser();
    }, []);


    return (<>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>

                        </button>

                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <Avatar name={user?.name} size={32} />
                                </button>
                            </div>
                            <div className="z-50 mr-40 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white uppercase" role="none">
                                        {user?.name}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300 uppercase" role="none">
                                        {user?.email}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 uppercase" role="menuitem">Perfil ({user?.role})</p>
                                    </li>
                                    <li>
                                        <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 uppercase" role="menuitem">
                                            Status ({user?.status ? 'Ativo' : 'Inativo'})
                                        </p>
                                    </li>
                                    <li>
                                        <p

                                            className="block px-4 py-2 text-sm text-gray-700  dark:text-gray-300 uppercase"
                                            role="menuitem"
                                        >
                                            criado em ({user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString('pt-BR') : 'Data indisponível'})
                                        </p>
                                    </li>


                                    <li>
                                        <p className="block px-4 py-2 text-sm text-gray-700  dark:text-gray-300 uppercase" role="menuitem">ultimo login ({user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('pt-BR') : 'Data indisponível'})</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {menuItems.map(({ label, href, icon, onClick }, index) => (
                        <li key={index}>
                            <Link
                                to={href}
                                onClick={onClick}
                                className="uppercase flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {icon}
                                <span className="ms-3">{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>


    </>

    );
};
