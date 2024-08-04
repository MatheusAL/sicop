
'use client'
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery} from '@tanstack/react-query';
import { Button } from "@/components/ui/button";

export interface Process{
    referencia: string,
    descricao: string,
    maquinaId: string,
    produtoId: string,
    tempo: string

}
export default function CreateProcessForm() {
    const [referencia, setReferencia] = useState('');
    const [descricao, setDescricao] = useState('');
    const [maquinaId, setMaquina] = useState('');
    const [produtoId, setProduto] = useState('');
    const [tempo, setTempo] = useState('');
    const queryClient = useQueryClient();

    const addProcess = async (newProcess: Process) => {
        const response = await fetch('/api/processos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProcess),
        });

        if (!response.ok) {
            throw new Error('Failed to add processo');
        }

        return response.json();
    };

    const mutation = useMutation({mutationFn: addProcess,
        onSuccess: () => {
            queryClient.invalidateQueries(['processos']);
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ referencia, descricao, maquinaId, produtoId, tempo });
      };
    

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
    //////////////////////////////////////////////
    const getMaquinas = async () => {
        const response = await fetch('/api/maquinas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    }

    const { data: maquinasData, isLoading: isLoadingMaquinas, isError: isErrorMaquinas } = useQuery({
        queryFn: getMaquinas,
        queryKey: ["maquinas"],
    })

    //use effect to update initial data
    useEffect(() => {
        if (productsData?.data && productsData.data.length > 0) {
            setProduto(productsData.data[0].id);  // Define o primeiro produto como valor inicial
        }
    }, [productsData]);

    useEffect(() => {
        if (maquinasData?.data && maquinasData.data.length > 0) {
            setMaquina(maquinasData.data[0].id);  // Define a primeira máquina como valor inicial
        }
    }, [maquinasData]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col min-h-screen space-y-4 p-6 bg-white rounded-lg shadow-md">
            <div className="flex-1 space-y-4">
                <h1 className="text-2xl font-bold my-6">Criar Novo Processo</h1>
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
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Máquina:</label>
                    <select className="p-2 border border-gray-300 rounded" value={maquinaId}
                        onChange={(e) => setMaquina(e.target.value)}>
                        {!isLoadingMaquinas && maquinasData.data.length > 0 ? (
                        maquinasData.data.map((maquina, index) => (
                            <option key={index} value={maquina.id}>{maquina.nome}</option>
                        ))
                        ) : (
                            <option disabled>Sem máquinas cadastradas</option>
                        )}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Nome:</label>
                    <input 
                        type="text" 
                        id="referencia" 
                        name="referencia" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-2 font-medium text-gray-700">Descrição:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time" className="mb-2 font-medium text-gray-700">Tempo(segundos):</label>
                    <input
                        id="time" 
                        name="time"
                        type="number"
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                        value={tempo}
                        onChange={(e) => setTempo(e.target.value)}
                    />
                </div>
            </div>
            {mutation.isPending && <p>Adicionando...</p>}
            {mutation.isError && <p>Error: {mutation.error.message}</p>}
            {mutation.isSuccess && <p>Processo adicionado com sucesso!</p>}
            <div className="flex space-x-4">
                <Button type="submit" className="flex-1 py-3 bg-green-400 text-white font-semibold rounded hover:bg-green-500 transition duration-300">Criar</Button>
                <Button type="reset" className="flex-1 py-3 bg-red-400 text-white font-semibold rounded hover:bg-red-500 transition duration-300">Limpar</Button>
            </div>
        </form>


    );
}