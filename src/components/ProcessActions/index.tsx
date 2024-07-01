'use client'
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'

export default function ProcessActions() {
    const router = useRouter();
 
    const navigateToCreate = () => {
        router.push('/processos/criar')
    }
    return (
    
        <div className="p-3 flex justify-between">
            <div className="product">
                <label htmlFor="product" >Produto</label>
                <select>
                    <option>a</option>
                    <option>b</option>
                    <option>c</option>
                    <option>d</option>
                </select>
            </div>
            <Button onClick={navigateToCreate}>Adicionar processo</Button>
        </div>
    );
}