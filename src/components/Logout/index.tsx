'use client'

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function Logout() {

    return (
        <Button className="py-2.5 mx-auto mt-auto mb-3 bg-gray-800 text-white" onClick={()=> signOut()}>
            Sair
        </Button>
    );
}