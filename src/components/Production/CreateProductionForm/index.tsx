'use client'
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";

export interface Producao{
    colaboradorId: string,
    processoId: string,
    produtoId: string,
    dataProducao: string
    tempo: string

}
export default function CreateProductionForm() {
    const [tempo, setTempo] = useState('');
    const [dataProducao, setDataProducao] = useState('');
    const [colaboradorId, setColaborator] = useState('');
    const [produtoId, setProduto] = useState('');
    const [processoId, setProcesso] = useState('');
    
    const queryClient = useQueryClient();

    const addProducao = async (newProducao: Producao) => {
        const response = await fetch('/api/producao', {
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
            setTempo('');
            setDataProducao('');
            setColaborator('')
            setProduto('');
            setProcesso('');
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ tempo,  dataProducao, processoId, colaboradorId, produtoId});
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

    const getProcessos = async () => {
        const response = await fetch(`/api/processos?produtoId=${produtoId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    }

    const { data: processesData, isLoading: isLoadingProcess, isError: isErrorProcesses } = useQuery({
        queryFn: getProcessos,
        queryKey: ["processos", produtoId],
        enabled: !!produtoId,
    })


    useEffect(() => {
        if (productsData?.data && productsData.data.length > 0) {
            setProduto(productsData.data[0].id);  // Define o primeiro produto como valor inicial
        }
    }, [productsData]);

    useEffect(() => {
        if (processesData?.data && processesData.data.length > 0) {
            setProcesso(processesData.data[0].id);  // Define a primeira máquina como valor inicial
        }
    }, [processesData]);

    useEffect(() => {
        if (colaboratorData?.data && colaboratorData.data.length > 0) {
            setColaborator(colaboratorData.data[0].id);  // Define a primeira máquina como valor inicial
        }
    }, [colaboratorData]);



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
                    <select className="p-2 border border-gray-300 rounded" value={processoId}
                        onChange={(e) => { setProcesso(e.target.value); console.log("Produto selecionado:", e.target.value);}}>
                        {produtoId && !isLoadingProcess && processesData.data.length > 0 ? (
                        processesData.data.map(( processes, index) => (
                            <option key={index} value={processes.id}>{processes.referencia}</option>
                        ))
                        ) : (
                            <option disabled>Sem processos cadastrados para esse produto</option>
                        )}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="date" className="mb-2 font-medium text-gray-700">Data:</label>
                    <input 
                        id="date" 
                        name="date"
                        type="date" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                        onChange={(e) => setDataProducao(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time" className="mb-2 font-medium text-gray-700">Tempo(segundos):</label>
                    <input
                    id="time" 
                    name="time"
                    type="number"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    onChange={(e) => setTempo(e.target.value)}
                    />
                </div>
            </div>
            {mutation.isPending && <p>Adicionando...</p>}
            {mutation.isError && <p>Error: {mutation.error.message}</p>}
            {mutation.isSuccess && <p>Colaborador adicionado com sucesso!</p>}
            <div className="flex space-x-4">
                <Button type="submit" className="flex-1 py-3 bg-green-400 text-white font-semibold rounded hover:bg-green-500 transition duration-300">Criar</Button>
                <Button type="reset" className="flex-1 py-3 bg-red-400 text-white font-semibold rounded hover:bg-red-500 transition duration-300">Limpar</Button>
            </div>
        </form>
    )
}