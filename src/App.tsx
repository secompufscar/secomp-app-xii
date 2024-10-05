import Routes from './routes';
import './styles/global.css';

import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './hooks/AuthContext'

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor='transparent' />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

