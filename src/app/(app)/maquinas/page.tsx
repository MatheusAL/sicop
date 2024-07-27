import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Machines from "@/components/Machines";

export default function Maquinas() {
   
    const queryClient = new QueryClient();
    return (
        <main className="min-h-screen p-6">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Machines />
            </HydrationBoundary>
        </main>)
}
  
