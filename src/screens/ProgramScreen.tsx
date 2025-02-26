import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/ProgramStyles';
import Colors from '../themes/colors';
// import { Image } from 'expo-image';

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
  const [programas, setProgramas] = useState<Programa[]>([
    { id: '1', fechaInscripcion: '2024-02-10', nombre: 'Ruta Riesgo Cardiovascular', medico: 'Dr. Juan Pablo Vargas', fechaProximaCita: '2025-07-05', estado: 'Pendiente' },
    { id: '2', fechaInscripcion: '2024-03-15', nombre: 'Ruta de P y M Vejez', medico: 'Dra. María Camila Gómez', fechaProximaCita: '2025-08-05', estado: 'Cumplida' },
    { id: '3', fechaInscripcion: '2024-01-20', nombre: 'Programa de Control de Diabetes', medico: 'Dr. Andrés Rodríguez', fechaProximaCita: '2025-06-20', estado: 'Cancelada' },
    { id: '4', fechaInscripcion: '2024-04-05', nombre: 'Programa de Salud Mental', medico: 'Dra. Luisa Herrera', fechaProximaCita: '2025-09-15', estado: 'Pendiente' },
    { id: '5', fechaInscripcion: '2024-05-12', nombre: 'Programa de Rehabilitación Física', medico: 'Dr. Carlos Mendoza', fechaProximaCita: '2025-10-10', estado: 'Cumplida' },
    { id: '6', fechaInscripcion: '2024-06-18', nombre: 'Programa de Nutrición Balanceada', medico: 'Dra. Andrea Rojas', fechaProximaCita: '2025-11-20', estado: 'Cancelada' },
    { id: '7', fechaInscripcion: '2024-07-25', nombre: 'Programa de Prevención de Obesidad', medico: 'Dr. Samuel Pérez', fechaProximaCita: '2025-12-05', estado: 'Pendiente' },
    { id: '8', fechaInscripcion: '2024-08-03', nombre: 'Programa de Control de Hipertensión', medico: 'Dra. Sofia Morales', fechaProximaCita: '2026-01-18', estado: 'Cumplida' },
    { id: '9', fechaInscripcion: '2024-09-10', nombre: 'Programa de Terapia Respiratoria', medico: 'Dr. Luis Fernández', fechaProximaCita: '2026-02-22', estado: 'Pendiente' },
    { id: '10', fechaInscripcion: '2024-10-05', nombre: 'Programa de Revisión Cardiológica', medico: 'Dra. Paula Ramírez', fechaProximaCita: '2026-03-10', estado: 'Cancelada' }
  ]);

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
