import React, { useState } from "react";
import type { UpdateUserManagerProps } from "../types/updateUserManager";

export const UpdateUsermanagerForm: React.FC<UpdateUserManagerProps> = ({
    initialImage,
    initialName,
    initialRole,
    initialStatus,
    mode,
    onUpdate,
    onDelete
}) => {
    const [status, setStatus] = useState(initialStatus);
    const [role, setRole] = useState(initialRole);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value === "ativo";
        setStatus(newStatus);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        setRole(newRole);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ status, role });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col lg:flex-row  justify-center md:justify-between  items-center px-6 border-b mx-auto mt-10"
        >
            <div className=" flex flex-col lg:flex-row mx-auto items-center space-x-4 p-4 w-full lg:w-auto justify-center  ">
                <img src={initialImage} alt={initialName} className="h-20 w-20 rounded-full" />
                <div className="font-medium text-lg text-gray-900 text-center mt-4 ml:mt-0">{initialName}</div>
            </div>

            <div className="p-4 w-full lg:w-1/4">
                {mode === "admin" ? (
                    <select
                        value={role}
                        onChange={handleRoleChange}
                        className="rounded border border-gray-300 px-4 py-2 w-full"
                    >
                        <option value="user">Usuário</option>
                        <option value="admin">Admin</option>
                    </select>
                ) : (
                    <span>{initialRole}</span>
                )}
            </div>

            <div className="p-4 w-full lg:w-1/4">
                {mode === "admin" ? (
                    <select
                        value={status ? "ativo" : "inativo"}
                        onChange={handleStatusChange}
                        className="rounded border border-gray-300 px-4 py-2 w-full"
                    >
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                ) : (
                    <span className="flex items-center">
                        <span
                            className={`mr-2 h-2.5 w-2.5 rounded-full ${initialStatus ? "bg-green-500" : "bg-red-500"
                                }`}
                        />
                        {initialStatus ? "Ativo" : "Inativo"}
                    </span>
                )}
            </div>

            <div className="flex space-x-4 p-4 w-full lg:w-auto ">
                <button
                    type="submit"
                    className="rounded bg-blue-500 py-2 px-6 text-white hover:bg-blue-700 w-full"
                >
                    Atualizar
                </button>
                <button
                    type="button"
                    className="rounded bg-red-500 py-2 px-6 text-white hover:bg-red-700 w-full"
                    onClick={onDelete}
                >
                    Deletar
                </button>
            </div>
        </form>
    );
};
