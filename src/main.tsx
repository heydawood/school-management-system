import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from '@/Redux/StoreProvider';
import './index.css';

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>,
    // </StrictMode>
  );
}
