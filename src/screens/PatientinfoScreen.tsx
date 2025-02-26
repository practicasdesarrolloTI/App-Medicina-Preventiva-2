import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../themes/colors";
import styles from "../styles/PatientinfoStyles";

const PatientInfoScreen = ({ navigation }: any) => {
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

      {/* Información del Paciente */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}><Text style={styles.bold}>Nombre:</Text> Pablo Pérez Gómez</Text>
        <Text style={styles.label}><Text style={styles.bold}>Edad:</Text> 56 años</Text>
        <Text style={styles.label}><Text style={styles.bold}>Sexo:</Text> Masculino</Text>
        <Text style={styles.label}><Text style={styles.bold}>Dirección:</Text> Cra 23-65-123</Text>
        <Text style={styles.label}><Text style={styles.bold}>Teléfono:</Text> 34988934</Text>
        <Text style={styles.label}><Text style={styles.bold}>Ciudad:</Text> Barranquilla</Text>
        <Text style={styles.label}><Text style={styles.bold}>Departamento:</Text> Atlántico</Text>
        <Text style={styles.label}><Text style={styles.bold}>Antecedentes personales:</Text> Hipertensión Arterial</Text>
        <Text style={styles.label}><Text style={styles.bold}>Médico de cabecera:</Text> Antonio Castro López</Text>
        <Text style={styles.label}><Text style={styles.bold}>Especialidad:</Text> Médico experto Cardiovascular</Text>
      </View>
    </View>
  );
};



export default PatientInfoScreen;