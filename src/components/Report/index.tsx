'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomTable from '@/components/Table';
import ReportActions from '../ReportActions';
export default function Report() {

    const getReport = async () => {
        const response = await fetch('/api/relatorio');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    };
    const headers = ["colaborador", "data", "eficiencia"];
    const { data, error, isLoading } = useQuery({
        queryKey: ["getReport"],
        queryFn: getReport,
    });

    const transformedEfficiencyData = data && data.data.map(item => ({
        colaborador: item.nome,
        data: item.date,
        eficiencia: `${item.eficiencia}%`,
    }));
    return (
        <>
            <h1 className="text-4xl"> Relatório de produtividade </h1>
            <section className="pt-4 px-2">
                <ReportActions />
                {data && <CustomTable data={transformedEfficiencyData} headers={headers} tableDescription={'Lista de produtividade.'}/>}
            </section>
        </>
    )
}