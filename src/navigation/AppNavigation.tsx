import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import ProgramScreen from '../screens/ProgramScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Appointment: undefined;
  Resultados: undefined;
  TusProgramas: undefined;
  TusCitas: undefined;
  Formulas_Ordenes: undefined;
  Tramites_Autorizaciones: undefined;
  Autocuidado: undefined;
  Alertas: undefined;
  Enterate: undefined;
  Servicios: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TusCitas" component={AppointmentScreen} />
        <Stack.Screen name="TusProgramas" component={ProgramScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
