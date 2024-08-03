'use client'
import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";

export interface Producao{
    nome: string,
    descricao: string,
    referencia: string
}
export default function CreateProductionForm() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [referencia, setReferencia] = useState('');
    const [colaboradorId, setColaborator] = useState('');
    const [produtoId, setProduto] = useState('');
    const queryClient = useQueryClient();

    const addProducao = async (newProducao: Producao) => {
        const response = await fetch('/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProducao),
        });

        if (!response.ok) {
            throw new Error('Failed to add Producao');
        }

        return response.json();
    };

    const mutation = useMutation({mutationFn: addProducao,
        onSuccess: () => {
            queryClient.invalidateQueries(['producao']);
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ nome, referencia, descricao});
      };
    
    //get data neeeded
    const getColaborators = async () => {
        const response = await fetch('/api/colaboradores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    }

    const { data: colaboratorData, isLoading: isLoadingColaborators, isError: isErrorColaboradors } = useQuery({
        queryFn: getColaborators,
        queryKey: ["colaboradores"],
    })


    const getProducts = async () => {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    }

    const { data: productsData, isLoading: isLoadingProducts, isError: isErrorProducts } = useQuery({
        queryFn: getProducts,
        queryKey: ["produtos"],
    })
    return (
        <form onSubmit={handleSubmit} className="flex flex-col min-h-screen space-y-4 p-6 bg-white rounded-lg shadow-md">
        <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold my-6">Criar Nova Produção</h1>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Colaborador:</label>
                    <select className="p-2 border border-gray-300 rounded" value={colaboradorId}
                        onChange={(e) => { setColaborator(e.target.value); console.log("Produto selecionado:", e.target.value);}}>
                        {!isLoadingColaborators && colaboratorData.data.length > 0 ? (
                        colaboratorData.data.map((colaborator, index) => (
                            <option key={index} value={colaborator.id}>{colaborator.nome}</option>
                        ))
                        ) : (
                            <option disabled>Sem colaboradores cadastrados</option>
                        )}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Produto:</label>
                    <select className="p-2 border border-gray-300 rounded" value={produtoId}
                        onChange={(e) => { setProduto(e.target.value); console.log("Produto selecionado:", e.target.value);}}>
                        {!isLoadingProducts && productsData.data.length > 0 ? (
                        productsData.data.map((product, index) => (
                            <option key={index} value={product.id}>{product.nome}</option>
                        ))
                        ) : (
                            <option disabled>Sem produtos cadastrados</option>
                        )}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Processo:</label>
                    <select className="p-2 border border-gray-300 rounded">
                        <option>OP A</option>
                        <option>OP B</option>
                        <option>OP C</option>
                        <option>OP D</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-2 font-medium text-gray-700">Data:</label>
                    <input 
                        id="description" 
                        name="description"
                        type="date" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time" className="mb-2 font-medium text-gray-700">Tempo(segundos):</label>
                    <input
                    id="time" 
                    name="time"
                    type="number"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                </div>
            </div>
            <div className="flex space-x-4">
                <Button type="submit" className="flex-1 py-3 bg-green-400 text-white font-semibold rounded hover:bg-green-500 transition duration-300">Criar</Button>
                <Button type="reset" className="flex-1 py-3 bg-red-400 text-white font-semibold rounded hover:bg-red-500 transition duration-300">Limpar</Button>
            </div>
        </form>
    )
}