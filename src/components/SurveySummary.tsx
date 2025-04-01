import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import colors from '../themes/colors';
import { submitSurveyResult } from '../services/surveyResultService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'SurveySummary'>;

type Respuesta =
  | string
  | number
  | {
    texto: string;
    valor: number;
  };

const SurveySummary: React.FC<Props> = ({ route, navigation }) => {
  const { surveyId, puntaje, edad, sexo, survey } = route.params;
  const { responses } = route.params as unknown as { responses: Respuesta[] };

  const estaturaStr = responses[0] as string;
  const pesoStr = responses[1] as string;

  const estatura = parseFloat(estaturaStr);
  const peso = parseFloat(pesoStr);

  const imc = peso && estatura ? peso / (estatura * estatura) : NaN;



  const getRecomendacion = () => {
    if (!survey?.recomendaciones) return '';
    const recomendacion = survey.recomendaciones.find((rec: any) => {
      const sexoMatch = rec.sexo === null || rec.sexo?.toLowerCase() === sexo.toLowerCase();
      return rec.min <= puntaje && puntaje <= rec.max && sexoMatch;
    });
    return recomendacion?.texto || 'No se encontró recomendación.';
  };

  const handleSubmit = async () => {
    try {
      const storedPatientId = await AsyncStorage.getItem('documento');
      if (!storedPatientId) {
        Alert.alert('Error', 'No se encontró el documento del paciente.');
        return;
      }

      const recomendacion = getRecomendacion();

      const result = await submitSurveyResult({
        surveyId,
        patientId: storedPatientId,
        surveyName: survey.nombre,
        responses: responses.map((r) => (typeof r === 'object' && 'texto' in r ? r.texto : String(r))),
        puntaje,
        edad,
        sexo,
        recomendacion,
      });

      if (result.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.error,
        });

      } else {
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: 'Resultado guardado correctamente',
          position: 'top',
          visibilityTime: 5000,
        });
        navigation.navigate('Home');
      }
    } catch (e) {
      Alert.alert('Error', 'Algo salió mal al guardar la encuesta.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen de la Encuesta</Text>

      <Text style={styles.label}>Encuesta:</Text>
      <Text style={styles.value}>{survey?.nombre || 'Desconocida'}</Text>

      <Text style={styles.label}>Edad:</Text>
      <Text style={styles.value}>{edad} años</Text>

      <Text style={styles.label}>Sexo:</Text>
      <Text style={styles.value}>{sexo}</Text>

      <>
        <Text style={styles.label}>IMC:</Text>
        <Text style={styles.value}>{isNaN(imc) ? 'No disponible' : imc.toFixed(2)}</Text>
      </>


      <Text style={styles.label}>Respuestas:</Text>
      {responses.map((r, i) => (
        <Text key={i}>
          {typeof r === 'object' ? `${r.texto} (${r.valor})` : r}
        </Text>
      ))}



      <Text style={styles.label}>Puntaje Total:</Text>
      <Text style={styles.value}>{puntaje}</Text>

      <Text style={styles.label}>Recomendación:</Text>
      <Text style={styles.recommendation}>{getRecomendacion()}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleSubmit}>
        <Text style={styles.backButtonText}>Enviar Encuesta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SurveySummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  value: {
    marginBottom: 8,
    fontSize: 16,
    color: '#555',
  },
  response: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  recommendation: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 8,
    color: '#222',
  },
  backButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
