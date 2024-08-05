'use client'
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";

export interface Produto{
    nome: string,
    descricao: string,
}
export default function CreateProductForm() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const queryClient = useQueryClient();

    const addProduto = async (newColaborador: Produto) => {
        const response = await fetch('/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newColaborador),
        });

        if (!response.ok) {
            throw new Error('Failed to add Produto');
        }

        return response.json();
    };

    const mutation = useMutation({mutationFn: addProduto,
        onSuccess: () => {
            queryClient.invalidateQueries(['produtos']);
            setNome('');
            setDescricao('');
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ nome, descricao});
      };
    
    return (
    <form onSubmit={handleSubmit} className="flex flex-col  min-h-screen space-y-4 p-6 bg-white rounded-lg shadow-md">
        <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold my-6">Criar Novo Produto</h1>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Nome:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Descrição:</label>
                    <textarea 
                        id="descricao" 
                        name="descricao" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
            </div>
            {mutation.isPending && <p>Adicionando...</p>}
            {mutation.isError && <p>Error: {mutation.error.message}</p>}
            {mutation.isSuccess && <p>Produto adicionado com sucesso!</p>}
            <div className="flex space-x-4">
                <Button type="submit" className="flex-1 py-3 bg-green-400 text-white font-semibold rounded hover:bg-green-500 transition duration-300">Criar</Button>
                <Button type="reset" className="flex-1 py-3 bg-red-400 text-white font-semibold rounded hover:bg-red-500 transition duration-300">Limpar</Button>
            </div>
        </form>
    )
}