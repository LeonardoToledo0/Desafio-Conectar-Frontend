export interface MenuItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    rolesAllowed: string[];
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
} 