import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { getToken, logoutUser } from "../services/authService";
import styles from '../styles/HomeStyles';
import Toast from "react-native-toast-message";

// Definir el tipo de las props
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();
            if (!token) navigation.replace("Login"); // Redirigir si no hay token
            setUserToken(token);
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        Toast.show({
            type: 'success',
            text1: 'Sesión cerrada',
            text2: 'Has cerrado sesión correctamente.',
        });
        navigation.replace("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a Bienestar IPS</Text>
            <Text style={styles.subtitle}>Gestión de salud y prevención</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.buttonText}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TusCitas')}>
                <Text style={styles.buttonText}>Ver Mis Citas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TusProgramas')}>
                <Text style={styles.buttonText}>Ver Mis Programas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Resultados')}>
                <Text style={styles.buttonText}>Resultados Médicos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Medicamentos')}>
                <Text style={styles.buttonText}>Medicamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Autocuidado')}>
                <Text style={styles.buttonText}>Autocuidado</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};


export default HomeScreen;
