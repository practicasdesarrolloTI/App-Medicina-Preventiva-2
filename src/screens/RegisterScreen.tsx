import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { registerUser } from '../services/authService';
import styles from '../styles/RegisterStyles';
import { Picker } from '@react-native-picker/picker';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [documentType, setDocumentType] = useState<DocumentType | ''>('');
  const [document, setDocumentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!documentType || !document || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const result = await registerUser(documentType, Number(document), password);

    if (result) {
      Alert.alert("Error", result.message || "Error en el registro");
    } else {
      Alert.alert("Éxito", "Registro exitoso. Ahora inicia sesión.");
      navigation.replace("Login");
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
