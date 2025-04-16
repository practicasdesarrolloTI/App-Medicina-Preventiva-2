import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import colors from '../themes/colors';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/MedicamentStyles';
import { Image } from 'expo-image';
import { fetchMedicaments } from '../services/medicamentService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definición de Props para navegación
type Props = NativeStackScreenProps<RootStackParamList, 'Medicamentos'>;



type Medicamento = {
    id: string;
    nombre: string;
    fechaOrden: string;
    medico: string;
    estado: 'Pendiente' | 'Reformulado' | 'Descargado';
};

const MedicamentScreen: React.FC<Props> = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const loadData = async () => {
            try {
                const tipo = await AsyncStorage.getItem('tipoDocumento');
                const doc = await AsyncStorage.getItem('documento');
                if (!tipo || !doc) throw new Error('Faltan datos del paciente');

                const data = await fetchMedicaments(tipo, doc);
                setMedicamentos(data);
            } catch (error) {
                Alert.alert('Error', 'No se pudo cargar la información de los medicamentos');
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Image source={require('../../assets/icons8-medicine.gif')} style={styles.imageSize} />
            </View>
            <Text style={styles.title}>Gestión de Medicamentos</Text>
            {/* Indicador de carga */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Cargando información de sus Medicamentos...</Text>
                </View>
            ) : medicamentos ? (
                <FlatList
                    data={medicamentos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.text}><FontAwesome5 name="pills" size={16} /> {item.nombre}</Text>
                            <Text style={styles.text}><MaterialIcons name="event" size={16} /> {item.fechaOrden}</Text>
                            <Text style={styles.text}><FontAwesome5 name="user-md" size={16} /> {item.medico}</Text>
                            <Text style={[styles.status, item.estado === 'Pendiente' ? styles.pending : item.estado === 'Reformulado' ? styles.reformulated : styles.downloaded]}>
                                {item.estado}
                            </Text>
                            <View style={styles.buttonContainer}>

                            </View>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.errorText}>No se pudo cargar la información de sus Medicamentos</Text>
            )}
        </View>
    );
};

export default MedicamentScreen;
