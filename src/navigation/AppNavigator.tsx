import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { colors } from '../config/theme';

/**
 * AppNavigator - Navegação Principal
 * 
 * Gerencia a alternância entre as rotas públicas (AuthStack) e privadas (AppStack)
 * baseado no estado de autenticação fornecido pelo AuthProvider.
 * 
 * Funcionalidade:
 * 1. Usa o contexto de autenticação do AuthProvider
 * 2. Durante o loading inicial, exibe um indicador de carregamento
 * 3. Se autenticado: mostra AppStack (rotas privadas)
 * 4. Se não autenticado: mostra AuthStack (rotas públicas)
 * 5. A navegação é automática - sem necessidade de redirecionamentos manuais
 */
export default function AppNavigator() {
  const { user, loading } = useAuth();

  /**
   * Loading Screen
   * 
   * Exibida durante a verificação inicial de autenticação.
   * Evita flashes de telas incorretas enquanto o Firebase verifica a sessão.
   */
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light }}>
        <ActivityIndicator 
          size="large" 
          color={colors.primary}
          testID="auth-loading-indicator"
        />
      </View>
    );
  }

  /**
   * Navegação Condicional
   * 
   * Se user está definido: usuário autenticado → AppStack
   * Se user é null: usuário não autenticado → AuthStack
   */
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
