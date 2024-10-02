import { useEffect } from 'react';
import Routes from './routes';
import './styles/global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthProvider } from './hooks/AuthContext';

export default function App() {
  
  // Função de logout automático ao iniciar o aplicativo
  const logoutAllUsers = async () => {
    try {
      // Remover os dados de usuário do AsyncStorage
      await AsyncStorage.clear();
      console.log('Usuário deslogado automaticamente ao iniciar o aplicativo.');
    } catch (error) {
      console.error("Erro ao deslogar todas as contas:", error);
    }
  };

  useEffect(() => {
    // Desloga o usuário assim que o aplicativo inicia
    logoutAllUsers();
  }, []); // Executa apenas na montagem do componente

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}