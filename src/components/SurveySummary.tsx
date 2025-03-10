import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/SurveyStyles";
import { useNavigation } from "@react-navigation/native";
import { submitSurvey } from "../services/SurveyService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigation";

type SurveySummaryProps = NativeStackScreenProps<RootStackParamList, "SurveySummary">;

const SurveySummary: React.FC<SurveySummaryProps> = ({ route, navigation }) => {
  const { surveyId, responses } = route.params;

  const handleSubmit = async () => {
    const result = await submitSurvey(surveyId, responses);
    if (result.error) {
      Alert.alert("Error", result.error);
    } else {
      Alert.alert("Éxito", "Encuesta enviada correctamente");
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de Respuestas</Text>
      {responses.map((response, index) => (
        <Text key={index} style={styles.response}>
          {`Pregunta ${index + 1}: ${response}`}
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Encuesta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SurveySummary;
