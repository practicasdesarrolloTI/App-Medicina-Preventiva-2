import React, { useState } from "react";


import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "../styles/SurveyStyles";
import { useNavigation } from "@react-navigation/native";
import { submitSurvey } from "../services/SurveyService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SurveyScreenProps = NativeStackScreenProps<RootStackParamList, "SurveyScreen">;
  
type Pregunta = 
  | string
  | {
      pregunta: string;
      opciones: { texto: string; valor: number }[];
    };

const SurveyScreen: React.FC<SurveyScreenProps> = ({ route }) => {
  const { preguntas, surveyId } = route.params as { preguntas: Pregunta[]; surveyId: string };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>(Array(preguntas.length).fill(""));

  const handleNext = () => {
  if (!responses[currentIndex]) {
    Alert.alert("Error", "Por favor, responde la pregunta antes de continuar.");
    return;
  }

  if (currentIndex < preguntas.length - 1) {
    setCurrentIndex(currentIndex + 1);
  } else {
    navigation.navigate("SurveySummary", { surveyId, responses });
  }
};

  const handleResponseChange = (text: string) => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex] = text;
    setResponses(updatedResponses);
  };

  const renderQuestion = () => {
    const currentQuestion = preguntas[currentIndex];

    if (typeof currentQuestion === "string") {
      return (
        <>
          <Text style={styles.question}>{currentQuestion}</Text>
          <TextInput
            style={styles.input}
            value={responses[currentIndex]}
            onChangeText={handleResponseChange}
            placeholder="Escribe tu respuesta aquí"
          />
        </>
      );
    }

    return (
        <>
          <Text style={styles.question}>{currentQuestion.pregunta}</Text>
          {currentQuestion.opciones.map((opcion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleResponseChange(opcion.texto)}
            >
              <Text style={styles.optionText}>{opcion.texto}</Text>
            </TouchableOpacity>
          ))}
        </>
      );
    };
  
    return (
      <View style={styles.container}>
        {renderQuestion()}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex < preguntas.length - 1 ? "Siguiente" : "Finalizar"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

export default SurveyScreen;
