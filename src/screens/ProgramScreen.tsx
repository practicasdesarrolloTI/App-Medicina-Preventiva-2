import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/ProgramStyles';
// import { Image } from 'expo-image';
import { fetchPrograms } from '../services/programService';

// Definición de Props para navegación
type Props = NativeStackScreenProps<RootStackParamList, 'TusProgramas'>;

type Programa = {
  id: string;
  fechaInscripcion: string;
  nombre: string;
  medico: string;
  fechaProximaCita: string;
  estado: 'Pendiente' | 'Cumplida' | 'Cancelada';
};

const ProgramScreen: React.FC<Props> = ({ navigation }) => {
  const [programas, setProgramas] = useState<Programa[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPrograms();
      setProgramas(data);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.imageSize}>
          <MaterialIcons name="assignment" size={50} />
        </View>
      </View>
      <Text style={styles.title}>Tus Programas</Text>
      <FlatList
        data={programas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}><MaterialIcons name="event" size={16} /> {item.fechaInscripcion}</Text>
            <Text style={styles.text}><FontAwesome5 name="clipboard-list" size={16} /> {item.nombre}</Text>
            <Text style={styles.text}><FontAwesome5 name="user-md" size={16} /> {item.medico}</Text>
            <Text style={styles.text}><MaterialIcons name="date-range" size={16} /> {item.fechaProximaCita}</Text>
            <Text style={[styles.status, item.estado === 'Pendiente' ? styles.pending : item.estado === 'Cancelada' ? styles.cancelled : styles.completed]}>
              {item.estado}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProgramScreen;
