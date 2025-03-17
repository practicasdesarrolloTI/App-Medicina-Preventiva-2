import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/SelfCareStyles';
import SurveyCard from '../components/SurveyCard';
import { Image } from 'expo-image';
import { findriscSurvey } from '../data/findriscSurvey'; // Importamos la encuesta FINDRISC

type Props = NativeStackScreenProps<RootStackParamList, 'Autocuidado'>;

export type Survey = {
  id: string;
  nombre: string;
  descripcion: string;
  custom?: boolean;
  preguntas: (
    | string
    | {
        pregunta: string;
        opciones: { texto: string; valor: number }[];
      }
  )[];
};

  
  

const SelfCareScreen: React.FC<Props> = ({ navigation }) => {
  const [encuestas, setEncuestas] = useState<Survey[]>([
    findriscSurvey, // Incluimos la encuesta FINDRISC
    { id: '2', nombre: 'COULD IT BE COPD', descripcion: 'Evalúa síntomas de EPOC', preguntas: ['¿Tiene tos frecuente?', '¿Siente falta de aire?'] },
    { id: '3', nombre: 'Karnofsky Scale', descripcion: 'Evalúa el estado funcional', preguntas: ['¿Puede realizar tareas sin ayuda?', '¿Se siente fatigado?'] },
  ]);

  // 🔄 Navegar a la encuesta seleccionada
  const handleOpenSurvey = (survey: Survey) => {
    navigation.navigate('SurveyScreen', {
      surveyId: survey.id,
      preguntas: survey.preguntas,
    });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/icons8-trust.gif')} style={styles.imageSize} />
      </View>

      <Text style={styles.title}>Autocuidado</Text>

      <FlatList
        data={encuestas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SurveyCard
            survey={item}
            onPress={() => handleOpenSurvey(item)}
          />
        )}
      />
    </View>
  );
};

export default SelfCareScreen;
