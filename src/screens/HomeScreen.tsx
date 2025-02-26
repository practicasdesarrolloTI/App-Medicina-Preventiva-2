import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { auth } from '../../firebase';
import styles from '../styles/HomeStyles';

// Definir el tipo de las props
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.replace('Login');
        } catch (error: any) {
            alert(error.message);
        }
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
