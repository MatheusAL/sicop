'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomTable from '@/components/Table';
import ProductsActions from '../ProductsActions';
export default function Products() {

    const getProducts = async () => {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    };
    const headers = ['id', 'nome', 'descricao'];
    const { data, error, isLoading } = useQuery({
        queryKey: ["produtos"],
        queryFn: getProducts,
    });
    return (
        <>
            <h1 className="text-4xl"> Produtos </h1>
            <section className="pt-4 px-2">
                <ProductsActions />
                
                {data && <CustomTable data={data.data} headers={headers} tableDescription={'Lista dos produtos da empresa.'}/>}
            </section>
        </>
    )
}