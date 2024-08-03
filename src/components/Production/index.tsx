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
    const headers = ['id', 'produtoId',  'colaboradorId', 'processoId', 'tempo', 'data'];
    const { data, error, isLoading } = useQuery({
        queryKey: ["producao"],
        queryFn: getProducao,
    });
    return (
        <>
            <h1 className="text-4xl"> Produção </h1>
            <section className="pt-4 px-2">
                <ProductionActions/>
                
                {data && <CustomTable data={data.data} headers={headers} tableDescription={'Lista da produção da empresa'}/>}
            </section>
        </>
    )
}