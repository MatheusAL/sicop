'use client'
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'

export default function ProductionActions() {
    const router = useRouter();
 
    const navigateToCreate = () => {
        router.push('/producao/criar')
    }
    return (
    
        <div className="p-3 flex justify-end">
            <Button onClick={navigateToCreate}>Adicionar Produção</Button>
        </div>
    );
}