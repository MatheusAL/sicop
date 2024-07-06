import { Button } from "@/components/ui/button";
export default function CreateProduction() {
  return (
    <main className="min-h-screen">
      <form className="flex flex-col min-h-screen space-y-4 p-6 bg-white rounded-lg shadow-md">
        <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold my-6">Criar Novo Processo</h1>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Colaborador:</label>
                    <select className="p-2 border border-gray-300 rounded">
                        <option>Matheus</option>
                        <option>Matheus</option>
                        <option>Matheus</option>
                        <option>Matheus</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Produto:</label>
                    <select className="p-2 border border-gray-300 rounded">
                        <option>Produto A</option>
                        <option>Produto B</option>
                        <option>Produto C</option>
                        <option>Produto D</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Operação:</label>
                    <select className="p-2 border border-gray-300 rounded">
                        <option>OP A</option>
                        <option>OP B</option>
                        <option>OP C</option>
                        <option>OP D</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-2 font-medium text-gray-700">Data:</label>
                    <input 
                        id="description" 
                        name="description"
                        type="date" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time" className="mb-2 font-medium text-gray-700">Tempo(segundos):</label>
                    <input
                    id="time" 
                    name="time"
                    type="number"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                </div>
            </div>
            <div className="flex space-x-4">
                <Button type="submit" className="flex-1 py-3 bg-green-400 text-white font-semibold rounded hover:bg-green-500 transition duration-300">Criar</Button>
                <Button type="reset" className="flex-1 py-3 bg-red-400 text-white font-semibold rounded hover:bg-red-500 transition duration-300">Limpar</Button>
            </div>
        </form>

    </main>
  );
};