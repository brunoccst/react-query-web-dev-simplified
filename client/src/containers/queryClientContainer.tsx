import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const DEFAULT_STALE_TIME = 1000 * 60 * 5; // Data only goes to stale state after 5 minutes 

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: DEFAULT_STALE_TIME
        }
    }
});

type Props = {
    children: ReactNode | ReactNode[]
    useDebugger?: boolean
}

export const QueryClientContainer = ({ children, useDebugger = false }: Props) => {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
            {useDebugger && <ReactQueryDevtools />}
        </QueryClientProvider>
    )
}