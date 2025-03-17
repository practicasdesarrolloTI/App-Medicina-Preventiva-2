import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/SelfCareStyles';
import { Survey } from '../screens/SelfCareScreen';

type Props = {
  survey: Survey;
  onPress: () => void;
};

const SurveyCard: React.FC<Props> = ({ survey, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}><FontAwesome5 name="clipboard-list" size={16} /> {survey.nombre}</Text>
      <Text style={styles.description}>{survey.descripcion}</Text>
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SurveyCard;
