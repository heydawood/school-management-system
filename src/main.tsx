import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from '@/Redux/StoreProvider';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootElement = document.getElementById('root')!;

// Create a client
const queryClient = new QueryClient()

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>

    <StoreProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </StoreProvider>,
    
    // </StrictMode>
  );
}
