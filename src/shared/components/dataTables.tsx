import React from "react";
import type { DataTableProps } from "../types/dataTable.types";

export const DataTable: React.FC<DataTableProps> = ({
    columns,
    children,
    actionBar,
    title,
    mode
}) => {
    return (
        <section>
            <h2 className="mb-4 text-xl font-semibold">{title}</h2>

            <div className="relative h-screen overflow-auto shadow-md sm:rounded-lg">
                {actionBar && mode === 'admin' && (
                    <div
                        className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 bg-white p-4 border-b"
                    >
                        {actionBar}
                    </div>
                )}

                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="px-6 py-3">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </section>
    );
};
