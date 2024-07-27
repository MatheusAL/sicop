'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomTable from '@/components/Table';
import Actions from '@/components/Actions';
export default function Colaborators() {

    const getColaboradores = async () => {
        const response = await fetch('/api/colaboradores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    };
    const headers = ['id', 'nome', 'tempoDisponivel'];
    const { data, error, isLoading } = useQuery({
        queryKey: ["colaboradores"],
        queryFn: getColaboradores,
    });
    return (
        <>
            <h1 className="text-4xl"> Colaboradores </h1>
            <section className="pt-4 px-2">
                <Actions />
                
                {data && <CustomTable data={data.data} headers={headers} tableDescription={'Lista dos colaboradores da empresa.'}/>}
            </section>
        </>
    )
}