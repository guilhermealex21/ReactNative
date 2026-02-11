import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenPublic from '../screens/HomeScreenPublic';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

/**
 * AuthStack - Rotas Públicas
 * 
 * Contém todas as telas de autenticação:
 * - Home: Tela inicial com links para Login/Cadastro
 * - LoginSignup: Tela de login
 * - Register: Tela de cadastro
 * - ForgotPassword: Tela de recuperação de senha
 * 
 * Estas rotas são acessíveis apenas para usuários não autenticados
 */
export default function AuthStack() {
  return (
    <Stack.Navigator
      id="AuthStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreenPublic}
      />
      <Stack.Screen 
        name="LoginSignup" 
        component={LoginSignupScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          title: 'Cadastro',
        }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          title: 'Recuperar Senha',
        }}
      />
    </Stack.Navigator>
  );
}
