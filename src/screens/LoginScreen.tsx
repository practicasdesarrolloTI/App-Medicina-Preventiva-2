import React, { useState } from "react";
import { View, Image } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { loginUser } from "../services/authService";
import styles from "../styles/AuthStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!document || !password) {
      setMessage("Todos los campos son obligatorios");
      setVisible(true);
      return;
    }

    const result = await loginUser(Number(document), password);

    if (!result.success) {
      setMessage(result.message);
      setVisible(true);
    } else {
      setMessage("Inicio de sesión exitoso");
      setVisible(true);
      setTimeout(() => navigation.replace("Home"), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo5.png")} style={styles.logo} />
      <Text variant="titleLarge" style={styles.title}>
        Iniciar Sesión
      </Text>

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
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Iniciar Sesión
      </Button>

      <Button onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </Button>

      {/* 📌 Mensaje de error/exito con Snackbar */}
      <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={2000}>
        {message}
      </Snackbar>
    </View>
  );
};

export default LoginScreen;
