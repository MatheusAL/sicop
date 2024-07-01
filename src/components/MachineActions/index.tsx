'use client'
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'

export default function MachineActions() {
    const router = useRouter();
 
    const navigateToCreate = () => {
        router.push('/maquinas/criar')
    }
    return (
    
        <div className="p-3 flex justify-end">
            <Button onClick={navigateToCreate}>Adicionar máquina</Button>
        </div>
    );
}