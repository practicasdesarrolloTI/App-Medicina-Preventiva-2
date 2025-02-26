import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import styles from '../styles/SelfCareStyles';
import { Survey } from '../screens/SelfCareScreen';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (survey: Survey) => void;
  editingSurvey: Survey | null;
};

const SurveyForm: React.FC<Props> = ({ visible, onClose, onSubmit, editingSurvey }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preguntas, setPreguntas] = useState<string[]>([]);
  const [nuevaPregunta, setNuevaPregunta] = useState('');

  // 🛠️ Limpiar formulario al abrir una nueva encuesta
  useEffect(() => {
    if (visible) {
      if (editingSurvey) {
        setNombre(editingSurvey.nombre);
        setDescripcion(editingSurvey.descripcion);
        setPreguntas([...editingSurvey.preguntas]); 
      } else {
        setNombre('');
        setDescripcion('');
        setPreguntas([]); 
      }
    }
  }, [visible, editingSurvey]);

  // 📌 Agregar pregunta sin borrar las anteriores
  const agregarPregunta = () => {
    if (nuevaPregunta.trim()) {
      setPreguntas((prevPreguntas) => [...prevPreguntas, nuevaPregunta]); 
      setNuevaPregunta(''); 
    }
  };

  // 🚨 Validar antes de guardar
  const handleSaveSurvey = () => {
    if (!nombre.trim() || !descripcion.trim() || preguntas.length === 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios y debes agregar al menos una pregunta.');
      return;
    }

    const updatedSurvey: Survey = {
        id: editingSurvey ? editingSurvey.id : `custom-${Date.now()}`, // Solo encuestas creadas pueden editarse
        nombre,
        descripcion,
        preguntas,
      };

    // onSubmit({ id: editingSurvey ? editingSurvey.id : '', nombre, descripcion, preguntas });
    onSubmit(updatedSurvey);
    onClose();
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{editingSurvey ? "Editar Encuesta" : "Crear Encuesta"}</Text>

          <TextInput style={styles.input} placeholder="Nombre de la encuesta" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />

          <TextInput
            style={styles.input}
            placeholder="Nueva pregunta"
            value={nuevaPregunta}
            onChangeText={setNuevaPregunta}
            onSubmitEditing={agregarPregunta} 
          />
          <TouchableOpacity style={styles.addQuestionButton} onPress={agregarPregunta}>
            <Text style={styles.addQuestionText}>+ Agregar Pregunta</Text>
          </TouchableOpacity>

          <FlatList
            data={preguntas}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.questionText}>• {item}</Text>}
          />

          {/* 📌 Botón para cerrar sin guardar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>

          {/* 📌 Botón para guardar (solo si los campos están llenos) */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSaveSurvey}>
            <Text style={styles.submitButtonText}>{editingSurvey ? "Guardar Cambios" : "Guardar Encuesta"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SurveyForm;
