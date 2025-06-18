import React, { useState } from "react";
import type { UpdateUserProps } from "../types/updateUser.types";


export const UpdateUserForm: React.FC<UpdateUserProps> = ({
    initialName,
    initialEmail,
    onSubmit,
}) => {
    const [name, setName] = useState(initialName ?? "");
    const [email, setEmail] = useState(initialEmail ?? "");

    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, password });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded shadow mx-auto w-full"
        >
            <h2 className="mb-4 text-xl font-semibold text-center">Atualizar Dados</h2>

            <label className="block mb-2 font-medium" htmlFor="name">
                Nome
            </label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="currentuser"
                className="mb-4 w-full rounded border border-gray-300 p-2"
            />

            <label className="block mb-2 font-medium" htmlFor="email">
                Email
            </label>
            <input
                id="email"
                type="email"
                value={email}
                autoComplete="currentemail"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
            />

            <label className="block mb-2 font-medium" htmlFor="password">
                Senha
            </label>
            <input
                id="password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite uma nova senha"
                className="mb-6 w-full rounded border border-gray-300 p-2"
            />

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="w-auto rounded bg-blue-600 py-2 px-10 text-white hover:bg-blue-700"
                >
                    Atualizar
                </button>
            </div>
        </form>
    );
};
