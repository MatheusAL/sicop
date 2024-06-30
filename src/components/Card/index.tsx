import Link from "next/link";

export default function Card({ name, icon, pageLink}) {
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