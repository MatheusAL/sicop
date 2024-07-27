'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomTable from '@/components/Table';
import ProcessActions from '@/components/ProcessActions';
export default function Processes() {

    const getProcesses = async () => {
        const response = await fetch('/api/processos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    };
    const headers = ['id', 'referencia', 'maquina', 'descricao', 'tempo'];
    const { data, error, isLoading } = useQuery({
        queryKey: ["processos"],
        queryFn: getProcesses,
    });
    return (
        <>
            <h1 className="text-4xl"> Processos </h1>
            <section className="pt-4 px-2">
                <ProcessActions />
                
                {data && <CustomTable data={data.data} headers={headers} tableDescription={'Lista das máquinas utilizadas na empresa.'}/>}
            </section>
        </>
    )
}