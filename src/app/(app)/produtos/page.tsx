import Products from "@/components/Products";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default function Produtos() {
    const queryClient = new QueryClient();
    return (
        <main className="min-h-screen p-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
                
            <Products />
        </HydrationBoundary>
        </main>)
}
  
