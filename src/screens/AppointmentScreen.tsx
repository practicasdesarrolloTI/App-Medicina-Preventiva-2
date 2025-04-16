import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import styles from '../styles/AppointmentStyles';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { fetchAppointments } from '../services/appointmentService';
import Colors from '../themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'TusCitas'>;

const AppointmentScreen: React.FC<Props> = ({ navigation }) => {

  interface Cita {
    id: string;
    fecha: string;
    hora: string;
    especialidad: string;
    programa: string;
    medico: string;
    estado: string;
  }

  const [citas, setCitas] = useState<Cita[]>([]);

  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const loadData = async () => {
      try {
        const tipoDocumento = (await AsyncStorage.getItem('tipoDocumento')) ?? '';
        const numeroDocumento = (await AsyncStorage.getItem('documento')) ?? ''; 

        console.log('Tipo de documento:', tipoDocumento);
        console.log('Número de documento:', numeroDocumento);
  
        const data = await fetchAppointments(tipoDocumento, numeroDocumento);

        console.log('Datos de citas:', data);
  
        // Formateamos los datos según el tipo `Cita`
        const citasFormateadas = data.map((item: any, index: number) => ({
          id: index.toString(), // si no hay ID único en el backend
          fecha: item.fecha_cita?.split(' ')[0] || '',
          hora: item.fecha_cita?.split(' ')[1]?.slice(0, 5) || '',
          especialidad: item.Especialidad || '',
          programa: item.programa || '—', // si lo tienes después, agrégalo
          medico: item.nombre_medico || '',
          estado: item.estado || '',
        }));
  
        setCitas(citasFormateadas);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la información de las citas");
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/icons8-calendario.gif')} style={styles.imageSize} />
      </View>
      <Text style={styles.title}>Tus Citas</Text>

      {/* Indicador de carga */}
      {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Cargando información de sus Citas...</Text>
      </View>
    ) : citas.length > 0 ? (
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>
              <MaterialIcons name="date-range" size={16} /> {item.fecha} - 
              <FontAwesome5 name="clock" size={16} /> {item.hora}
            </Text>
            <Text style={styles.text}>
              <FontAwesome5 name="user-md" size={16} /> {item.medico}
            </Text>
            <Text style={styles.text}>
              <MaterialIcons name="medical-services" size={16} /> {item.especialidad}
            </Text>
            <Text style={[
              styles.status, 
              item.estado.toLowerCase() === 'pendiente' ? styles.pending : styles.completed
            ]}>
              {item.estado}
            </Text>
          </View>
        )}
      />
    ) : (
      <Text style={styles.errorText}>No hay citas disponibles para mostrar.</Text>
    )}

    </View>
  );
};


export default AppointmentScreen;
