import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../styles/RegisterStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo1.jpeg')} style={{ width: 400, height: 159 }} />
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.input} placeholder="Número de documento" value={documentNumber} onChangeText={setDocumentNumber} />
      <TextInput style={styles.input} placeholder="Tipo de Documento" value={documentType} onChangeText={setDocumentType} />
      <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar Contraseña" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TextInput style={styles.input} placeholder="Número de Teléfono" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Departamento" value={department} onChangeText={setDepartment} />
      <TextInput style={styles.input} placeholder="Ciudad" value={city} onChangeText={setCity} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
