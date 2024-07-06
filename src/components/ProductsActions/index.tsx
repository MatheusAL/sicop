'use client'
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'

export default function ProductsActions() {
    const router = useRouter();
 
    const navigateToCreate = () => {
        router.push('/produtos/criar')
    }
    return (
    
        <div className="p-3 flex justify-end">
            <Button onClick={navigateToCreate}>Adicionar Produto</Button>
        </div>
    );
}