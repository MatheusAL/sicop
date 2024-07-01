'use client'
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'

export default function Actions() {
    const router = useRouter();
 
    const navigateToCreate = () => {
        router.push('/colaboradores/criar')
    }
    return (
    
        <div className="p-3 flex justify-end">
            <Button onClick={navigateToCreate}>Adicionar colaborador</Button>
        </div>
    );
}