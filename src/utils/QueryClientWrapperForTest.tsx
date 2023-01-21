import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const queryClientForTesting = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});
export const wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClientForTesting}>
      {children}
    </QueryClientProvider>
  );
};
