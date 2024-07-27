import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Colaborators from '@/components/Colaborators';


export default function Colaboradores() {
    const queryClient = new QueryClient();
    return (<main className="min-h-screen p-6">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Colaborators />
            </HydrationBoundary>
        </main>)
}
  
