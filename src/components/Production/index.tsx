'use client'
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomTable from '@/components/Table';
import ProductionActions from '@/components/ProductionActions';
export default function Production() {

    const getProducao = async () => {
        const response = await fetch('/api/producao');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    };
    const headers = ['id', 'produtoNome',  'colaboradorNome', 'processoReferencia', 'tempo', 'data'];
    const { data, error, isLoading } = useQuery({
        queryKey: ["producao"],
        queryFn: getProducao,
    });
    const transformedData = data && data.data.map(item => ({
        id: item.id,
        colaboradorNome: item.colaborador.nome,
        produtoNome: item.produto.nome,
        processoReferencia: item.processo.referencia,
        data: item.data, // Convert Date object to string
        tempo: item.tempo
    }));
    return (
        <>
            <h1 className="text-4xl"> Produção </h1>
            <section className="pt-4 px-2">
                <ProductionActions/>
                
                {data && <CustomTable data={transformedData} headers={headers} tableDescription={'Lista da produção da empresa'}/>}
            </section>
        </>
    )
}