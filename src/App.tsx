import Routes from './routes';
import './styles/global.css';

import { AuthProvider } from './hooks/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

