import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../themes/colors";
import styles from "../styles/PatientinfoStyles";
import { useState, useEffect } from "react";
import { fetchPatient } from "../services/patientService";
import { Alert } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Inicio'>;

type Paciente = {
  nombre: string;
  edad: number;
  sexo: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  departamento: string;
  antecedentes: string;
  medicoCabecera: string;
  especialidad: string;
};

const PatientInfoScreen: React.FC<Props> = ({ navigation }) => {
  const [Paciente, setPatient] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const data = await fetchPatient();
        setPatient(data);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la información del paciente");
      } finally {
        setLoading(false);
      }
    };
    loadPatient();
  }, []);



  return (
    <View style={styles.container}>
      {/* Botón para regresar al menú */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Icono de perfil centrado */}
      <View style={styles.profileIconContainer}>
        <MaterialIcons name="account-circle" size={100} color={colors.primary} />
      </View>


      {/* Indicador de carga */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando información...</Text>
        </View>
      ) : Paciente.length > 0 ? (
        <View style={styles.infoContainer}>
          {Paciente.map((paciente, index) => (
            <View key={index}>
              <Text style={styles.label}><Text style={styles.bold}>Nombre:</Text> {paciente.nombre}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Edad:</Text> {paciente.edad} años</Text>
              <Text style={styles.label}><Text style={styles.bold}>Sexo:</Text> {paciente.sexo}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Dirección:</Text> {paciente.direccion}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Teléfono:</Text> {paciente.telefono}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Ciudad:</Text> {paciente.ciudad}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Departamento:</Text> {paciente.departamento}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Antecedentes personales:</Text> {paciente.antecedentes}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Médico de cabecera:</Text> {paciente.medicoCabecera}</Text>
              <Text style={styles.label}><Text style={styles.bold}>Especialidad:</Text> {paciente.especialidad}</Text>
            </View>
          ))}
        </View>

      ) : (
        <Text style={styles.errorText}>No se pudo cargar la información del paciente.</Text>
      )}



      {/* Información del Paciente */}
    </View>
  );
};



export default PatientInfoScreen;