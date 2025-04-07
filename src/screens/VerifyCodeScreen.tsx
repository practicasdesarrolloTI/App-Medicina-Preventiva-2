import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { verifyRecoveryCode } from '../services/authService';
import styles from '../styles/AuthStyles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  VerifyCode: { document: string };
  ResetPassword: { document: string; code: string };
};

type VerifyCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyCode'>;
type VerifyCodeScreenRouteProp = RouteProp<RootStackParamList, 'VerifyCode'>;

const VerifyCodeScreen = ({ route, navigation }: { route: VerifyCodeScreenRouteProp; navigation: VerifyCodeScreenNavigationProp }) => {
  const { document } = route.params;
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      await verifyRecoveryCode(Number(document), code);
      navigation.navigate('ResetPassword', { document, code });
    } catch {
      Alert.alert("Error", "Código incorrecto o expirado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar Código</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de recuperación"
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Verificar código" onPress={handleVerify} />
    </View>
  );
};

export default VerifyCodeScreen;
