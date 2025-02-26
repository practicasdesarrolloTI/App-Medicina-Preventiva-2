import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import styles from '../styles/SelfCareStyles';
import { Survey } from '../screens/SelfCareScreen';

type Props = {
  visible: boolean;
  survey: Survey | null;
  onClose: () => void;
  onSubmitResponses: (surveyId: string, responses: string[]) => void;
};

const SurveyModal: React.FC<Props> = ({ visible, survey, onClose, onSubmitResponses }) => {
  const [responses, setResponses] = useState<string[]>([]);

  // 🛠️ Cargar preguntas en el estado cuando se abre la encuesta
  useEffect(() => {
    if (survey) {
      setResponses(Array(survey.preguntas.length).fill('')); // Inicializa respuestas vacías
    }
  }, [survey]);

  // 🚨 Validar antes de enviar respuestas
  const handleSendResponses = () => {
    if (responses.some(response => response.trim() === '')) {
      Alert.alert('Error', 'Por favor, responde todas las preguntas antes de enviar.');
      return;
    }
    if (survey) {
      onSubmitResponses(survey.id, responses); // Enviar respuestas
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{survey?.nombre}</Text>
          <ScrollView>
            {survey?.preguntas.map((pregunta, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>{pregunta}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe tu respuesta..."
                  value={responses[index]}
                  onChangeText={(text) => {
                    const newResponses = [...responses];
                    newResponses[index] = text;
                    setResponses(newResponses);
                  }}
                />
              </View>
            ))}
          </ScrollView>

          {/* 📌 Botón para Enviar Respuestas */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSendResponses}>
            <Text style={styles.submitButtonText}>Enviar Respuestas</Text>
          </TouchableOpacity>

          {/* 📌 Botón para cerrar sin enviar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SurveyModal;
