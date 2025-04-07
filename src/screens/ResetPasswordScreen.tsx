import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { resetPassword } from '../services/authService';
import styles from '../styles/AuthStyles';

import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  ResetPassword: { document: string; code: string };
  Login: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = ({ route, navigation }: Props) => {
  const { document, code } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (password !== confirmPassword) {
      return Alert.alert("Error", "Las contraseñas no coinciden.");
    }


    try {
      await resetPassword(Number(document), code, password);
      Alert.alert("Éxito", "Tu contraseña ha sido restablecida.");
      navigation.replace("Login");
    } catch {
      Alert.alert("Error", "No se pudo cambiar la contraseña.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Cambiar contraseña" onPress={handleReset} />
    </View>
  );
};

export default ResetPasswordScreen;
