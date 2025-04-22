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
// import { Button } from 'react-native';
// import { downloadMedicamentsOrder } from '../services/pdfServices';
import { agruparMedicamentosPorFecha, generarPDFMedicamentos } from '../services/pdfMedsService';
import { getPatientByDocument } from "../services/patientService";
import { calcularEdad } from '../utils/dateUtils';

// Definición de Props para navegación
type Props = NativeStackScreenProps<RootStackParamList, 'Medicamentos'>;

type Paciente = {
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    tipo_documento: string;
    documento: string;
    fecha_nacimiento: string;
    codigo_ips: number;
    sexo: string;
    celular: number;
    telefono: number;
    correo: string;
    eps: string;
    iat: number;
    tipo_documento_abreviado: string;
};

type Medicamento = {
    id: string;
    nombre: string;
    fechaOrden: string;
    medico: string;
    estado: 'Pendiente' | 'Reformulado' | 'Descargado';
};

const MedicamentScreen: React.FC<Props> = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [paciente, setPaciente] = useState<Paciente | null>(null);

    const [loading, setLoading] = useState(true); // Estado de carga

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

    const loadPatient = async () => {
        try {
            const storedDoc = await AsyncStorage.getItem('documento');
            if (!storedDoc) {
                Alert.alert("Error", "No se encontró el documento del paciente.");
                return;
            }

            const data = await getPatientByDocument(storedDoc);
            setPaciente(data as unknown as Paciente);
        } catch (error) {
            Alert.alert("Error", "Error al obtener información del paciente.");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatient();
        loadData();
    }, []);

    // const handleDownloadBack = async () => {
    //     try {
    //         const tipo = await AsyncStorage.getItem('tipoDocumento');
    //         const doc = await AsyncStorage.getItem('documento');

    //         if (tipo && doc) {
    //             await downloadMedicamentsOrder(tipo, doc);
    //         } else {
    //             throw new Error('Faltan datos del paciente');
    //         }
    //         Alert.alert('Éxito', 'La orden fue descargada y está lista para visualizar o compartir.');
    //     } catch {
    //         Alert.alert('Error', 'No se pudo descargar la orden.');
    //     }
    // };

    const handleDownload = async () => {
        try {
            const tipo = await AsyncStorage.getItem('tipoDocumento');
            const doc = await AsyncStorage.getItem('documento');
            const edad = paciente?.fecha_nacimiento ? calcularEdad(paciente.fecha_nacimiento) : 0;

            if (!tipo || !doc) throw new Error('Faltan datos del paciente');


            const agrupados = agruparMedicamentosPorFecha(medicamentos);


            const fechasOrden = Object.keys(agrupados);
            if (fechasOrden.length === 0) return Alert.alert('Sin medicamentos recientes', 'No hay medicamentos en los últimos 3 meses.');

            // Seleccionar la primera fecha (o podrías mostrar un Picker)
            const fechaSeleccionada = fechasOrden[0];
            await generarPDFMedicamentos({ nombre: paciente?.primer_nombre, tipoDocumento: paciente?.tipo_documento_abreviado, Documento: paciente?.documento, edad: edad }, agrupados[fechaSeleccionada], fechaSeleccionada);
            Alert.alert('Éxito', 'La orden fue generada y está lista para visualizar o compartir.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo generar la orden.');
        }
    };

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
                            {/* <Button title="Descargar Orden de Medicamentos" onPress={handleDownloadBack} /> */}
                            <TouchableOpacity style={styles.webButton} onPress={(handleDownload)}>
                                <Text style={styles.webButtonText}>Descargar Orden</Text>
                            </TouchableOpacity>
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
