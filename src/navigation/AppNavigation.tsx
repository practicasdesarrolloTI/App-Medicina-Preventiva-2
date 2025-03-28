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
import SurveyScreen from "../components/SurveyScreen";
import SurveySummary from "../components/SurveySummary";


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
  SurveySummary: {
    surveyId: string;
    responses: string[];
    puntaje: number;
    edad: number;
    sexo: string;
    survey: {
      id: string;
      nombre: string;
      descripcion: string;
      requiereEdad: boolean;
      requiereSexo: boolean;
      preguntas: {
        omitida: boolean;
        pregunta: string;
        opciones: { texto: string; valor: number; sexo: string }[];
        recomendaciones?: string;
      }[];
      recomendaciones?: {
        min: number;
        max: number;
        texto: string;
        sexo: string | null;
      }[];
    };
  };
  SurveyScreen: {
    surveyId: string;
    preguntas: {
      omitida: boolean;
      pregunta: string;
      opciones: { texto: string; valor: number; sexo: string }[];
      recomendaciones?: string;
    }[];
    edad: number;
    sexo: string;
    survey: {
      id: string;
      nombre: string;
      descripcion: string;
      preguntas: {
        omitida: boolean;
        pregunta: string;
        opciones: { texto: string; valor: number; sexo: string }[];
        recomendaciones?: string;
      }[];
      requiereEdad: boolean;
      requiereSexo: boolean;
    };
  };
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
        <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
        <Stack.Screen name="SurveySummary" component={SurveySummary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
