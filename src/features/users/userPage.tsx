import React, { useEffect, useState } from 'react';

import { Layout } from "../../shared/components/layout";
import { DataTable } from "../../shared/components/dataTables";
import { UserRow } from "../../shared/components/userRow";
import { UserRowSkeleton } from "../../shared/components/skeleton";
import { getUserById } from '../../shared/service/user.service';
import { useAuth } from '../../shared/hooks/authContext';
import { usePageTitle } from '../../shared/hooks/pageTitleContext';


export const User: React.FC = () => {
    const { setTitle } = usePageTitle()
    const { state, dispatch } = useAuth();
    useEffect(() => {
        setTitle("Perfil • Desafio Conéctar");
    }, [setTitle]);

    const [isLoading, setIsLoading] = useState(true);

    const columns = ["Image", "Nome", 'Perfil', "Status", "Ação"];

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const access_token = localStorage.getItem('access_token');
        if (!userId || !access_token || state.user) return;
        const Id = Number(userId)

        const fetchAndStoreUser = async () => {
            setIsLoading(true);
            try {
                const fetchedUser = await getUserById(Id);
                dispatch({ type: 'LOGIN', payload: fetchedUser });
            } catch (err) {
                console.error('Erro ao buscar usuário:', err);

            } finally {
                setIsLoading(false);
            }
        };

        fetchAndStoreUser();
    }, [dispatch]);
    const actionBar = (
        <>
            <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
                type="button"
            >
                Action
                <svg
                    className="ml-2 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 10 6"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </svg>
            </button>
            <div
                id="dropdownAction"
                className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
            >
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Reward
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Promote
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Activate account
                        </a>
                    </li>
                </ul>
            </div>
            <div className="relative ml-4">
                <input
                    type="text"
                    placeholder="Buscar usuário..."
                    className="w-80 rounded-lg border border-gray-300 p-2 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                    fill="none"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19 19l-4-4m0-7a7 7 0 10-14 0 7 7 0 0014 0z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </svg>
            </div>
        </>
    );

    return (
        <Layout title="Perfil">
            <DataTable columns={columns} actionBar={actionBar} title={`Olá, seja bem-vindo${state.user?.name ? ` ${state.user.name}` : ''}`} mode="user">
                {isLoading ? (
                    <>
                        <UserRowSkeleton />
                        <UserRowSkeleton />
                        <UserRowSkeleton />
                    </>
                ) : state.user ? (
                    <UserRow
                        image="https://i.pravatar.cc/150?img=3"
                        name={state.user.name}
                        email={state.user.email}
                        role={state.user.role === 'admin' ? 'Administrador' : 'Usuário'}
                        ativo={state.user.status}
                        mode="user"
                        userId={state.user.id}
                    />
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center py-4">
                            Nenhum usuário encontrado.
                        </td>
                    </tr>
                )}
            </DataTable>
        </Layout>
    );
};
