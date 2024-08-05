'use client'
import { FormEvent } from "react"
import { useState } from "react";
import { Button } from "../ui/button"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginForm() {
    const [message, setMessage] = useState('');
    const router = useRouter();
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        if(!response?.error) {
            router.push('/');
            router.refresh();
        } else {
            setMessage("Usuário ou senha incorrretos!");
        }
        
    }
    return( 
    <div className="mx-auto max-w-screen-md mt-10">
        <div className="flex items-center justify-center p-4 border-b">
            <a href="#" className="text-gray-800 text-5xl font-semibold">
                SICOP
            </a>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-2">
            {message &&  
                <div className="text-red-600 font-semibold">{message}</div>
            }
            <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold text-gray-700">Email:</label>
                    <input 
                        id="email" 
                        name="email"
                        type="text" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
            </div>
            <div className="flex flex-col">
                <label htmlFor="senha" className="mb-2 font-semibold text-gray-700">Senha:</label>
                    <input 
                        id="senha" 
                        name="password"
                        type="password" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
            </div>
            <Button className="py-2.5 bg-green-600 rounded font-semibold mt-3">Login!</Button>
            <span>Não possui uma conta ainda? <Link className="text-blue-800" href={"/registrar"}>Criar conta!</Link></span>
        </form>
    </div>)
}