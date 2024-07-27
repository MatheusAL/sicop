'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomTable from '@/components/Table';
import MachineActions from '@/components/MachineActions';
export default function Machines() {

    const getMachines = async () => {
        const response = await fetch('/api/maquinas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    };
    const headers = ['id', 'nome', 'descricao'];
    const { data, error, isLoading } = useQuery({
        queryKey: ["maquinas"],
        queryFn: getMachines,
    });
    return (
        <>
            <h1 className="text-4xl"> Máquinas </h1>
            <section className="pt-4 px-2">
                <MachineActions />
                
                {data && <CustomTable data={data.data} headers={headers}/>}
            </section>
        </>
    )
}