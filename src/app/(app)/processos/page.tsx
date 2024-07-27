import Processes from '@/components/Processes';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
export default function Processos() {
    
    const queryClient = new QueryClient();
    return (
        <main className="min-h-screen p-6">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Processes />
            </HydrationBoundary>
        </main>
    );
}
  
