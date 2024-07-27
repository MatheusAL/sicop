import Link from "next/link";
import { IconType } from "react-icons";

export interface CardProps {
    name: string,
    icon: React.ReactNode,
    pageLink: string
};
export default function Card({ name , icon, pageLink}:CardProps) {
    return (
        <Link href={pageLink}>
            <div
                className="bg-white p-4 rounded-lg shadow-lg flex items-center flex-col justify-center"
            >
                {icon}
                <h2 className="text-xl font-semibold">{name}</h2>
            </div>
        </Link>
    )
};