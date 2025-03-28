import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { registerUser } from '../services/authService';
import styles from '../styles/RegisterStyles';
import { Picker } from '@react-native-picker/picker';
import { checkPatientExists } from '../services/patientService';
import { getPatientByDocument } from '../services/patientService';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [documentType, setDocumentType] = useState<DocumentType | ''>('');
  const [document, setDocumentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!documentType || !document || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    

    setLoading(true);

  try {
    const patient = await getPatientByDocument(document);

    if (!patient) {
      Alert.alert("Error", "Este número de documento no está inscrito en la EPS.");
      return;
    }

    if (patient.tipo_documento !== (documentType as unknown as string)) {
      Alert.alert("Error", `El tipo de documento no coincide.`);
      return;
    }
    
    await registerUser(documentType, Number(document), password);

    Alert.alert("Registro exitoso", "Ya puedes iniciar sesión.");
    navigation.replace('Login');

  } catch (error) {
    Alert.alert("Error", "Ocurrió un error durante el registro.");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo1.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Registro</Text>

      {/* 📌 Selector para Tipo de Identificación */}
      <Picker
        selectedValue={documentType}
        onValueChange={(itemValue) => setDocumentType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione Tipo de Documento" value="" />
        <Picker.Item label="Cédula de Ciudadanía" value="CC" />
        <Picker.Item label="Cédula de Extranjería" value="CE" />
        <Picker.Item label="Pasaporte" value="PAS" />
        <Picker.Item label="Tarjeta de Identidad" value="TI" />
        <Picker.Item label="Registro Civil" value="RC" />
        <Picker.Item label="Número de Identidad" value="NI" />
      </Picker>

      {/* 📌 Número de Documento */}
      <TextInput
        style={styles.input}
        placeholder="Número de Documento"
        keyboardType="numeric"
        value={document}
        onChangeText={setDocumentNumber}
      />

      {/* 📌 Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 📌 Confirmar Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* 📌 Botón de Registro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
