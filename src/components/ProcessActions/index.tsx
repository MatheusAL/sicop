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
                <label htmlFor="product" >Produto:</label>
                <select className="p-2 mx-2 border border-gray-300 rounded">
                    <option></option>
                    <option>Produto A</option>
                    <option>Produto b</option>
                    <option>Produto c</option>
                    <option>Produto d</option>
                </select>
            </div>
            <Button onClick={navigateToCreate}>Adicionar processo</Button>
        </div>
    );
}