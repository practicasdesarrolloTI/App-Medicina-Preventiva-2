import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import colors from '../themes/colors';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/MedicamentStyles';
import { Image } from 'expo-image';

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
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
        { id: '1', nombre: 'Losartán 50mg', fechaOrden: '2024-02-10', medico: 'Dr. Juan Pérez', estado: 'Pendiente' },
        { id: '2', nombre: 'Metformina 850mg', fechaOrden: '2024-03-12', medico: 'Dra. María Gómez', estado: 'Reformulado' },
        { id: '3', nombre: 'Ibuprofeno 600mg', fechaOrden: '2024-04-05', medico: 'Dr. Carlos Mendoza', estado: 'Descargado' },
        { id: '4', nombre: 'Omeprazol 20mg', fechaOrden: '2024-05-15', medico: 'Dra. Luisa Herrera', estado: 'Pendiente' },
        { id: '5', nombre: 'Paracetamol 500mg', fechaOrden: '2024-06-20', medico: 'Dr. Samuel Pérez', estado: 'Reformulado' },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Image source={require('../../assets/icons8-medicine.gif')} style={styles.imageSize} />
            </View>
            <Text style={styles.title}>Gestión de Medicamentos</Text>
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
                            <TouchableOpacity style={styles.actionButton}>
                                <FontAwesome5 name="file-download" size={16} color={colors.white} />
                                <Text style={styles.buttonText}>Descargar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <FontAwesome5 name="redo" size={16} color={colors.white} />
                                <Text style={styles.buttonText}>Renovar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <FontAwesome5 name="file-medical" size={16} color={colors.white} />
                                <Text style={styles.buttonText}>Pedir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default MedicamentScreen;
