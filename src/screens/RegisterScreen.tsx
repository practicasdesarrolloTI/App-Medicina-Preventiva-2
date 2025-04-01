import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { registerUser } from '../services/authService';
import styles from '../styles/RegisterStyles';
import { Picker } from '@react-native-picker/picker';
import { checkPatientExists } from '../services/patientService';
import { getPatientByDocument } from '../services/patientService';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [documentType, setDocumentType] = useState<DocumentType | ''>('');
  const [document, setDocumentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  const handleRegister = async () => {
    if (!documentType || !document || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/; //debe contener al menos una letra y un número
    // if (!passwordRegex.test(password)) {
    //   Alert.alert("Error", "La contraseña debe tener entre 4 y 12 caracteres, contener al menos una letra y un número, y no tener símbolos especiales.");
    //   return;
    // }

    const passwordRegex = /^[a-zA-Z0-9]{2,12}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert("Error", "La contraseña debe ser alfanumérica y tener entre 4 y 12 caracteres.");
      return;
    }


    setLoading(true);

    try {
      const patient = await getPatientByDocument(document);

      if (!patient) {
        Toast.show({
          type: 'error',
          text1: '¡Registro fallido!',
          text2: 'Este número de documento no está inscrito en la EPS.',
        });
        return;
      }

      if (patient.tipo_documento !== (documentType as unknown as string)) {
        Toast.show({
          type: 'error',
          text1: '¡Registro fallido!',
          text2: 'El tipo de documento no coincide.',
        });
        return;
      }

      await registerUser(documentType, Number(document), password);

      Toast.show({
        type: 'success',
        text1: '¡Registro exitoso!',
        text2: 'Bienvenido a la app de Bienestar IPS',
      });
      navigation.replace('Login');

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '¡Registro fallido!',
        text2: 'Error al registrar, intenta nuevamente.',
      });
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
        onChangeText={(text) => {
          setPassword(text);
          // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/;
          const regex = /^[a-zA-Z0-9]{2,12}$/; //debe contener al menos una letra y un número
          setPasswordValid(regex.test(text));
          setPasswordsMatch(text === confirmPassword);
        }}
      />

      {!passwordValid && password.length > 0 && (
        <Text style={{ color: 'red', marginBottom: 8 }}>
          La contraseña debe tener entre 4 y 12 caracteres, incluir al menos una letra y un número, y no contener símbolos.
        </Text>
      )}

      {/* 📌 Confirmar Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setPasswordsMatch(password === text);
        }}
      />

      {!passwordsMatch && confirmPassword.length > 0 && (
        <Text style={{ color: 'red', marginBottom: 8 }}>
          Las contraseñas no coinciden.
        </Text>
      )}


      {/* 📌 Botón de Registro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>

  );
};

export default RegisterScreen;
