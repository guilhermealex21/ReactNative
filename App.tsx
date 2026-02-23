import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { debugFirebaseConnection } from './src/services/debugFirebase';
import { AuthProvider } from './src/context/AuthContext';

/**
 * App - Componente Principal
 * 
 * Responsabilidades:
 * 1. Envolver a aplicação com o AuthProvider (gerenciamento de autenticação)
 * 2. Configurar o StatusBar
 * 3. Rodar diagnóstico do Firebase ao iniciar
 * 4. Renderizar o AppNavigator que gerencia a navegação
 */
export default function App() {
  // Executar teste de conexão Firebase ao iniciar
  useEffect(() => {
    console.log('🚀 App iniciado - testando conexão com Firebase...');
    debugFirebaseConnection();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
