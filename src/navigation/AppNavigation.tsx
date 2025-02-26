import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import ProgramScreen from '../screens/ProgramScreen';
import ResultScreen from '../screens/ResultScreen';
import PatientInfoScreen from '../screens/PatientinfoScreen';
import Medicamentos from '../screens/MedicamentScreen';
import Autocuidado from '../screens/SelfCareScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Inicio: undefined;
  Appointment: undefined;
  Resultados: undefined;
  TusProgramas: undefined;
  TusCitas: undefined;
  Medicamentos: undefined;
  Autocuidado: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inicio" component={PatientInfoScreen} />
        <Stack.Screen name="TusCitas" component={AppointmentScreen} />
        <Stack.Screen name="TusProgramas" component={ProgramScreen} />
        <Stack.Screen name="Resultados" component={ResultScreen} />
        <Stack.Screen name="Medicamentos" component={Medicamentos} />
        <Stack.Screen name="Autocuidado" component={Autocuidado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
