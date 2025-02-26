import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/SelfCareStyles';
import { Survey } from '../screens/SelfCareScreen';

type Props = {
  survey: Survey;
  onPress: () => void;
  onEdit: () => void;
};

const SurveyCard: React.FC<Props> = ({ survey, onPress, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}><FontAwesome5 name="clipboard-list" size={16} /> {survey.nombre}</Text>
      <Text style={styles.description}>{survey.descripcion}</Text>
      
      <View style={styles.cardButtons}>
        <TouchableOpacity style={styles.startButton} onPress={onPress}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>

        {/* 📌 Solo encuestas creadas pueden editarse */}
        {survey.id.startsWith('custom-') && (
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <FontAwesome5 name="edit" size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SurveyCard;
