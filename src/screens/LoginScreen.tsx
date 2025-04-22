import React, { useState } from "react";
import { View, Image } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { loginUser } from "../services/authService";
import styles from "../styles/AuthStyles";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";
import colors from "../themes/colors";




type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [document, setDocument] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType | ''>('');
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);



  const handleLogin = async () => {

    // if (isBlocked) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Acceso bloqueado',
    //     text2: 'Has superado el límite de intentos. Intenta más tarde.',
    //   });
    //   setVisible(true);
    //   return;
    // }

    if (!documentType || !document || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Todos los campos son obligatorios.',
      });
      setVisible(true);
      return;
    }


    // if (isBlocked) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Acceso bloqueado',
    //     text2: 'Has superado el límite de intentos. Intenta más tarde.',
    //   });
    //   setVisible(true);
    //   return;
    // }

    
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/;
    // if (!passwordRegex.test(password)) {
    //   setMessage("La contraseña debe tener entre 4 y 12 caracteres, contener al menos una letra y un número, y no tener símbolos especiales.");
    //   setVisible(true);
    //   return;
    // }

    
    const passwordRegex = /^[a-zA-Z0-9]{2,12}$/;
    if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'La contraseña debe ser alfanumérica y tener entre 4 y 12 caracteres.',
      });
      setVisible(true);
      return;
    }

    const result = await loginUser(documentType, Number(document), password);

    await AsyncStorage.setItem('documento', document);
    await AsyncStorage.setItem('tipoDocumento', String(documentType));

    if (!result.success) {
      // setFailedAttempts(prev => {
      //   const newCount = prev + 1;
      //   if (newCount >= 5) {
      //     setIsBlocked(true);
      //     Toast.show({
      //       type: 'error',
      //       text1: 'Acceso bloqueado',
      //       text2: 'Has superado el límite de intentos.',
      //     });
      //   }
      //   return newCount;
      // });
      Toast.show({
        type: 'error',
        text1: 'Error de Inicio de Sesión',
        text2: 'Usuario o contraseña incorrectos.',
      });
      setVisible(true);
    } else {
      Toast.show({
        type: 'success',
        text1: '¡Inicio de Sesión Exitoso!',
        text2: 'Bienvenido!',
      });
      setTimeout(() => navigation.replace("Home"), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo5.png")} style={styles.logo} />
      <Text variant="titleLarge" style={styles.title}>
        Iniciar Sesión
      </Text>

      <Picker
        selectedValue={documentType}
        onValueChange={(itemValue) => setDocumentType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione Tipo de Documento" value="" style={{ color: colors.gray }} />
        <Picker.Item label="Cédula de Ciudadanía" value="CC" />
        <Picker.Item label="Cédula de Extranjería" value="CE" />
        <Picker.Item label="Pasaporte" value="PAS" />
        <Picker.Item label="Tarjeta de Identidad" value="TI" />
        <Picker.Item label="Registro Civil" value="RC" />
        <Picker.Item label="Número de Identidad" value="NI" />
      </Picker>



      {/* 📌 Número de Documento */}
      <TextInput
        label="Número de Documento"
        mode="outlined"
        keyboardType="numeric"
        value={document}
        onChangeText={setDocument}
        style={styles.input}
      />

      {/* 📌 Contraseña */}
      <TextInput
        label="Contraseña"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* 📌 Botón de Login */}
      <Button mode="contained" onPress={(handleLogin)} style={styles.button}>
        Iniciar Sesión
      </Button>

      <Button onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </Button>

      <Button onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </Button>

      {/* 📌 Mensaje de error/exito con Snackbar */}
      <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={2000}>
        {message}
      </Snackbar>
    </View>
  );
};

export default LoginScreen;
