import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import styles from '../styles/AppointmentStyles';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { fetchAppointments } from '../services/appointmentService';
import Colors from '../themes/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'TusCitas'>;

type Cita = {
  id: string;
  fecha: string;
  hora: string;
  especialidad: string;
  programa: string;
  medico: string;
  estado: string;
};

const AppointmentScreen: React.FC<Props> = ({ navigation }) => {

  const [citas, setCitas] = useState<Cita[]>([]);

  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAppointments();
        setCitas(data);
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
      ) : citas ? (
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}><MaterialIcons name="date-range" size={16} /> {item.fecha} - <FontAwesome5 name="clock" size={16} /> {item.hora}</Text>
              <Text style={styles.text}><FontAwesome5 name="user-md" size={16} /> {item.medico}</Text>
              <Text style={styles.text}><MaterialIcons name="medical-services" size={16} /> {item.especialidad}</Text>
              <Text style={[styles.status, item.estado === 'Pendiente' ? styles.pending : styles.completed]}>
                {item.estado}
              </Text>
            </View>
          )}
        />

      ) : (
        <Text style={styles.errorText}>No se pudo cargar la información de sus Citas</Text>
      )}

    </View>
  );
};


export default AppointmentScreen;
