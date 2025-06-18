export const UserRowSkeleton: React.FC = () => {
    return (
        <tr className="animate-pulse w-full">
            <td className="px-6 py-4">
                <div className="h-10 w-10 rounded-full bg-gray-300" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-32 rounded bg-gray-300" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-48 rounded bg-gray-300" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-24 rounded bg-gray-300" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-16 rounded bg-gray-300" />
            </td>
        </tr>
    );
};
