'use client'
import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function ProcessActions({ setProdutoId }) {
    const router = useRouter();
 
    const navigateToCreate = () => {
        router.push('/processos/criar')
    }

    const getProducts = async () => {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    }

    const { data, isLoading, isError } = useQuery({
        queryFn: getProducts,
        queryKey: ["produtos"],
    });

    //////update productId
    useEffect(() => {
        if (data && data.data.length > 0) {
            setProdutoId(data.data[0].id);  // Set initial produtoId
        }
    }, [data, setProdutoId]);
    return (
    
        <div className="p-3 flex justify-between">
            <div className="product">
                <label htmlFor="product">Produto:</label>
                <select className="p-2 mx-2 border border-gray-300 rounded" onChange={(e) => setProdutoId(e.target.value)}>
                    {!isLoading && data.data.length > 0 ? (
                        data.data.map((product, index) => (
                            <option key={index} value={product.id}>{product.nome}</option>
                        ))
                    ) : (
                        <option disabled>Sem produtos disponíveis</option>
                    )}
                </select>
            </div>
            <Button onClick={navigateToCreate}>Adicionar processo</Button>
        </div>
    );
}