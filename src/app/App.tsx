import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouterProvider } from './providers/RouterProvider';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
    </QueryClientProvider>
  );
};

export default App;
