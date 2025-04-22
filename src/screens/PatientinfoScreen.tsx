import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../themes/colors";
import styles from "../styles/PatientinfoStyles";
import { getPatientByDocument } from "../services/patientService";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calcularEdad } from '../utils/dateUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Inicio'>;

type Paciente = {
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  tipo_documento: string;
  documento: string;
  fecha_nacimiento: string;
  codigo_ips: number;
  sexo: string;
  celular: number;
  telefono: number;
  correo: string;
  eps: string;
  iat: number;
  tipo_documento_abreviado: string;
};

const PatientInfoScreen: React.FC<Props> = ({ navigation }) => {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);

  const edad = paciente?.fecha_nacimiento ? calcularEdad(paciente.fecha_nacimiento) : 0;

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const storedDoc = await AsyncStorage.getItem('documento');
        if (!storedDoc) {
          Alert.alert("Error", "No se encontró el documento del paciente.");
          return;
        }
  
        const data = await getPatientByDocument(storedDoc);
        setPaciente(data as unknown as Paciente);
      } catch (error) {
        Alert.alert("Error", "Error al obtener información del paciente.");
      }
      finally {
        setLoading(false);
      }
    };
  
    loadPatient();
  }, []);
  

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 20 }}>Cargando información del paciente...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón para regresar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Icono de perfil */}
      <View style={styles.profileIconContainer}>
        <MaterialIcons name="account-circle" size={100} color={colors.primary} />
      </View>

      {/* Información del paciente */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}><Text style={styles.bold}>Nombre:</Text> {paciente?.primer_nombre} {paciente?.segundo_nombre} {paciente?.primer_apellido} {paciente?.segundo_apellido}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Documento:</Text> {paciente?.tipo_documento_abreviado} {paciente?.documento}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Código IPS:</Text> {paciente?.codigo_ips}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Sexo:</Text> {paciente?.sexo === "M" ? "Masculino" : "Femenino"}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Fecha de Nacimiento:</Text> {paciente?.fecha_nacimiento}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Edad:</Text> {paciente ? calcularEdad(paciente.fecha_nacimiento) : "No disponible"} años</Text>
        <Text style={styles.label}><Text style={styles.bold}>Celular:</Text> {paciente?.celular}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Teléfono:</Text> {paciente?.telefono}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Correo:</Text> {paciente?.correo}</Text>
        <Text style={styles.label}><Text style={styles.bold}>EPS:</Text> {paciente?.eps}</Text>
        <Text style={styles.label}><Text style={styles.bold}>IAT:</Text> {paciente?.iat}</Text>
      </View>
    </View>
  );
};

export default PatientInfoScreen;
