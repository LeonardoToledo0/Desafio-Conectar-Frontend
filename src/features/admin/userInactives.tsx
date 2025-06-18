import type React from "react";
import { useEffect, useState } from "react";
import { getUserInative } from "../../shared/service/user.service";
import { Layout } from "../../shared/components/layout";
import { DataTable } from "../../shared/components/dataTables";
import { UserRow } from "../../shared/components/userRow";
import { UserRowSkeleton } from "../../shared/components/skeleton";
import { usePageTitle } from "../../shared/hooks/pageTitleContext";

interface User {
    id: number;
    name: string;
    email: string;
    lastLoginAt: string;
    role: "admin" | "user";
    status: boolean;
    updatedAt: string;
}

export const UserInactives: React.FC = () => {
    const { setTitle } = usePageTitle()
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [daysFilter, setDaysFilter] = useState<number>(30);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle("Usuarios Inativos • Desafio Conéctar");
    }, [setTitle]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUserInative(daysFilter);
                setUsers(fetchedUsers);
            }
            catch (error) {
                console.error("Erro ao buscar usuários inativos:", error);
                setUsers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [daysFilter]);


    const filtros = [
        { label: "15 Dias", value: 15 },
        { label: "30 Dias", value: 30 },
        { label: "45 Dias", value: 45 },
        { label: "60 Dias", value: 60 },
    ];

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const actionBar = (
        <>
            <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
                type="button"
            >
                Filtrar
                <svg className="ml-2 h-2.5 w-2.5" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>
            <div
                id="dropdownAction"
                className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-gray-600 shadow"
            >
                <ul
                    className="py-1 text-sm text-white"
                    aria-labelledby="dropdownActionButton"
                >
                    {filtros.map((f) => (
                        <li key={f.value}>
                            <p

                                onClick={(e) => {
                                    e.preventDefault();
                                    setDaysFilter(f.value);
                                }}
                                className={`block px-4 py-2 hover:bg-gray-800 ${daysFilter === f.value ? "bg-gray-800" : ""
                                    }`}
                            >
                                {f.label}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative ml-4">
                <input
                    type="text"
                    placeholder="Buscar usuário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 rounded-lg border border-gray-300 p-2 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M19 19l-4-4m0-7a7 7 0 10-14 0 7 7 0 0014 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </>
    );

    return (
        <Layout title="Usuários Inativos">
            <DataTable
                columns={["Imagem", "Nome", "Email", "Função", "Status"]}
                mode="admin"
                actionBar={actionBar}
            >
                {isLoading ? (
                    <>
                        <UserRowSkeleton />
                        <UserRowSkeleton />
                        <UserRowSkeleton />
                    </>
                ) : filteredUsers.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="text-center p-4 text-black font-bold text-xl">
                            Nenhum usuário encontrado.
                        </td>
                    </tr>
                ) : (
                    filteredUsers.map((user) => (
                        <UserRow
                            key={user.id}
                            image={`https://i.pravatar.cc/150?u=${user.id}`}
                            name={user.name}
                            email={user.email}
                            role={user.role === "admin" ? "Administrador" : "Usuário"}
                            ativo={user.status}
                            mode="admin"
                            userId={user.id}
                        />
                    ))
                )}
            </DataTable>
        </Layout>
    );


};
