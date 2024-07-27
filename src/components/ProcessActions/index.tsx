'use client'
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function ProcessActions() {
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
    })
    return (
    
        <div className="p-3 flex justify-between">
            <div className="product">
                <label htmlFor="product">Produto:</label>
                <select className="p-2 mx-2 border border-gray-300 rounded">
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