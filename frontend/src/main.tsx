import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './routes';
import { ContextoProvider } from './context/contexto';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextoProvider>
    <AppRouter />
  </ContextoProvider>,
);
