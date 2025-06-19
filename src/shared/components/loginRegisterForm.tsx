import React, { useState } from "react";
import type { LoginRegisterProps } from "../types/loginRegister.types";
import { Link } from "react-router-dom";
import BG from '../../assets/background.webp'



export const LoginRegisterForm: React.FC<LoginRegisterProps> = ({ mode, onSubmit, errorMessage, loading }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, password, confirmPassword: mode === 'register' ? confirmPassword : undefined });
    };



    return (
        <section className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${BG})` }}

        >
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
                <form onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                                Nome
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome"
                                autoComplete="username"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                    )}

                    <div className="mb-5">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                            E‑mail
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            autoComplete="useremail"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                            Senha
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {mode === 'register' && (
                        <div className="mb-5">
                            <label htmlFor="repeat-password" className="mb-2 block text-sm font-medium text-gray-900">
                                Repetir Senha
                            </label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        {loading ? 'Enviando ...' : mode === 'login' ? 'Entrar' : 'Registrar'}
                    </button>

                    {mode === 'login' && (
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
                            Não e registrado?{' '}
                            <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">
                                Criar conta
                            </Link>
                        </div>
                    )}


                </form>
            </div>
        </section>
    );
};
