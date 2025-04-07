import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { sendRecoveryCode } from '../services/authService';
import { getPatientByDocument } from '../services/patientService'; // ya lo tienes
import styles from '../styles/AuthStyles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation'; // Adjust the path to where RootStackParamList is defined

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: { navigation: ForgotPasswordScreenNavigationProp }) => {
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');

  const handleSendCode = async () => {
    try {
      const patient = await getPatientByDocument(document);
      if (!patient) return Alert.alert("Error", "Paciente no encontrado.");

      console.log("Paciente encontrado:", patient); // Verifica si el paciente se encuentra correctamente
      const correo = "christiandj456@outlook.com"; // ajusta al campo real de la respuesta
      setEmail(correo);

      console.log("Correo electrónico:", correo); // Verifica si el correo se obtiene correctamente

      console.log("Código de recuperación enviado al correo:", correo, "Voy a entrar a la función de envío de código", document); // Verifica que se llama a la función de envío de código
      
      await sendRecoveryCode(Number(document), correo);

      Alert.alert("Éxito", "Se ha enviado un código al correo registrado.");
      navigation.navigate('VerifyCode', { document });
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el código.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de documento"
        keyboardType="numeric"
        value={document}
        onChangeText={setDocument}
      />
      <Button title="Enviar código al correo" onPress={handleSendCode} />
    </View>
  );
};


export default ForgotPasswordScreen;
