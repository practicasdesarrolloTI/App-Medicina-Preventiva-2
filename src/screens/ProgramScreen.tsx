import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/ProgramStyles';
import { fetchPrograms } from '../services/programService';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definición de Props para navegación
type Props = NativeStackScreenProps<RootStackParamList, 'TusProgramas'>;

// type Programa = {
//   id: string;
//   fechaInscripcion: string;
//   nombre: string;
//   medico: string;
//   fechaProximaCita: string;
//   estado: 'Pendiente' | 'Cumplida' | 'Cancelada';
// };

const ProgramScreen: React.FC<Props> = ({ navigation }) => {
  const [programas, setProgramas] = useState<{ id: string; fecha_inscripcion: string; programa: string; medico: string; especialidad: string; }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const tipo = await AsyncStorage.getItem('tipoDocumento');
        const doc = await AsyncStorage.getItem('documento');
        if (!tipo || !doc) throw new Error('Datos incompletos');

        const data = await fetchPrograms(tipo, doc);

        const formateados = data.map((item: any, index: number) => ({
          id: index.toString(),
          fecha_inscripcion: item.fecha_cita?.split(' ')[0] ?? '',
          programa: item.especialidad_cita ?? '',
          medico: item.nombre_medico ?? '',
          especialidad: item.Especialidad ?? '',
        }));

        setProgramas(formateados);
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'No se pudieron cargar los programas');
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
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
      {/* Indicador de carga */}
      {loading ? (
        <ActivityIndicator size="large" color="#80006A" />
      ) : programas.length > 0 ? (
        <FlatList
          data={programas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>
                <MaterialIcons name="event" size={16} /> Fecha inscripción: {item.fecha_inscripcion}
              </Text>
              <Text style={styles.text}>
                <MaterialIcons name="assignment" size={16} /> Programa: {item.programa}
              </Text>
              <Text style={styles.text}>
                <MaterialIcons name="person" size={16} /> Médico: {item.medico}
              </Text>
              <Text style={styles.text}>
                <MaterialIcons name="medical-services" size={16} /> Especialidad: {item.especialidad}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>No hay programas registrados.</Text>
      )}
    </View>
  );
};

export default ProgramScreen;
