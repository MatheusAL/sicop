'use client'
import { FormEvent } from "react"
import { useState } from "react";
import { Button } from "../ui/button"
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('api/registrar', {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                name: formData.get('name')
            })
        })
        response.json().then(res =>{
            setMessage(res.message);
            router.push('/login');
        });
        
    }
    return( 
    <div className="mx-auto max-w-screen-md mt-10">
        <div className="flex items-center justify-center p-4 border-b">
            <a href="#" className="text-gray-800 text-5xl font-semibold">
                SICOP
            </a>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-2">
                
            <div className="flex flex-col">
                <label htmlFor="senha" className="mb-2 font-semibold text-gray-700">Nome:</label>
                    <input 
                        id="name" 
                        name="name"
                        type="name" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
            </div>
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
            {message &&  
                <div>{message}</div>
            }
            <Button className="py-2.5 bg-green-600 rounded font-semibold mt-3">Registrar!</Button>
        </form>
    </div>)
}