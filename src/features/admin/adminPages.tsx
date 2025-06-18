import React, { useEffect, useState } from "react";
import { Layout } from "../../shared/components/layout";
import { DataTable } from "../../shared/components/dataTables";
import { UserRow } from "../../shared/components/userRow";
import { UserRowSkeleton } from "../../shared/components/skeleton";
import { getAllUser } from "../../shared/service/user.service";
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

export const Admin: React.FC = () => {
    const { setTitle } = usePageTitle()
    const [users, setUsers] = useState<User[]>([]);
    const [statusFilter, setStatusFilter] = useState<"ativo" | "inativo" | "all">("all");
    const [roleFilter, setRoleFilter] = useState<"admin" | "user" | "all">("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle("Usuarios • Desafio Conéctar");
    }, [setTitle]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetched = await getAllUser();
                setUsers(fetched);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [])

    const filteredUsers = users.filter((u) => {
        const statusOk =
            statusFilter === "all" ||
            (statusFilter === "ativo" && u.status) ||
            (statusFilter === "inativo" && !u.status);

        const roleOk =
            roleFilter === "all" ||
            (roleFilter === "admin" ? u.role === "admin" : u.role === "user");

        const term = searchTerm.toLowerCase().trim();
        const searchOk =
            !term ||
            u.name.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term);

        return statusOk && roleOk && searchOk;
    });

    const filtros = [
        { label: "Ativo", value: "ativo" },
        { label: "Usuário", value: "user" },
        { label: "Administrador", value: "admin" },
        { label: "Inativo", value: "inativo" },
    ];

    const columns = ["Imagem", "Nome", "Perfil", "Status", "Ação"];

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
                                onClick={() => {
                                    if (f.value === "ativo" || f.value === "inativo") {
                                        setStatusFilter(f.value);
                                        setRoleFilter("all");
                                    } else {
                                        setRoleFilter(f.value as "user" | "admin");
                                        setStatusFilter("all");
                                    }
                                }}
                                className="block px-4 py-2 uppercase hover:bg-gray-800"
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
        <Layout title="Usuários">
            <DataTable
                columns={columns}
                actionBar={actionBar}
                title="Lista de Usuários"
                mode="admin"
            >
                {isLoading ? (
                    <>
                        <UserRowSkeleton />
                        <UserRowSkeleton />
                        <UserRowSkeleton />
                    </>
                ) : filteredUsers.length ? (
                    filteredUsers.map((u) => (
                        <UserRow
                            key={u.id}
                            image={`https://i.pravatar.cc/150?u=${u.id}`}
                            name={u.name}
                            email={u.email}
                            role={u.role === "admin" ? "Administrador" : "Usuário"}
                            ativo={u.status}
                            mode="admin"
                            userId={u.id}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="py-4 text-center">
                            Nenhum usuário encontrado…
                        </td>
                    </tr>
                )}
            </DataTable>
        </Layout>
    );
};
