import { Button } from "@/components/ui/button";

export default function CreateProduto() {
  return (
    <main className="min-h-screen">
      <form className="flex flex-col  min-h-screen space-y-4 p-6 bg-white rounded-lg shadow-md">
        <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold my-6">Criar Novo Produto</h1>
                <div className="flex flex-col">
                    <label htmlFor="reference" className="mb-2 font-medium text-gray-700">Referência:</label>
                    <input 
                        type="text" 
                        id="reference" 
                        name="reference" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Nome:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-2 font-medium text-gray-700">Descrição:</label>
                    <textarea 
                        id="description" 
                        name="description" 
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
