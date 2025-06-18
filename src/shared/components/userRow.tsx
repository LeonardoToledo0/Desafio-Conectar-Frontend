import React from "react";
import { Link } from "react-router-dom";
import type { UserRowProps } from "../types/userRow.types";


export const UserRow: React.FC<UserRowProps & { userId: number }> = ({
    userId,
    image,
    name,
    email,
    role,
    ativo,
    mode,
}) => {

    const editHref =
        mode === "admin"
            ? `/perfil/update/Manager/${userId}`
            : `/perfil/update/${userId}`;

    return (

        <tr className="border-b bg-white hover:bg-gray-50">
            <td className="px-6 py-4">
                <img src={image} alt={name} className="h-10 w-10 rounded-full" />
            </td>

            <td className="px-6 py-4 font-medium text-gray-900">
                <div className="text-base font-semibold">{name}</div>
                <div className="text-sm text-gray-500">{email}</div>
            </td>

            <td className="px-6 py-4">{role}</td>

            <td className="px-6 py-4">
                <span className="flex items-center">
                    <span
                        className={`mr-2 h-2.5 w-2.5 rounded-full ${ativo ? "bg-green-500" : "bg-red-500"
                            }`}
                    />
                    {ativo ? "Ativo" : "Inativo"}
                </span>
            </td>

            <td className="px-6 py-4">
                <Link to={editHref} className="font-medium text-blue-600 hover:underline">
                    Editar
                </Link>
            </td>
        </tr>



    );
};
