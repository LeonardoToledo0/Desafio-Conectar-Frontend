interface AvatarProps {
    name?: string;
    size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 32 }) => {

    const initials = (name ?? '')
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);


    return (
        <div
            style={{ width: size, height: size }}
            className="flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-semibold"
        >
            {initials || '??'}
        </div>
    );
};
