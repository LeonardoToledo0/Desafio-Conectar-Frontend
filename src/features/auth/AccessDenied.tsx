import React from "react";
import { useNavigate } from "react-router-dom";

export const AccessDenied: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg max-w-md w-full text-center">
                <svg
                    className="mx-auto mb-6 w-20 h-20 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c1.104 0 2 .896 2 2v2a2 2 0 11-4 0v-2c0-1.104.896-2 2-2z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 10-8 0v4"
                    />
                    <rect
                        width="16"
                        height="12"
                        x="4"
                        y="11"
                        rx="2"
                        ry="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                    Acesso Negado
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Você não tem permissão para acessar esta página.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="inline-block px-6 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                    Voltar para a página inicial
                </button>
            </div>
        </div>
    );
};
