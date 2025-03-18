import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles/ResultStyles";
import { fetchResults } from '../services/resultService';
import Colors from "../themes/colors";


type Resultado = {
  id: string;
  fechaRealizacion: string;
  examen: string;
  estado: string;
  programa: string;
};

const ResultScreen = ({ navigation }: any) => {


  const [resultados, setResultados] = useState<Resultado[]>([]);

  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchResults();
        setResultados(data);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la información de los resultados");
      }
      finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <View style={styles.container}>
      {/* Botón para regresar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={"white"} />
        </TouchableOpacity>
      </View>


      <Text style={styles.title}>Tus Resultados</Text>
      {/* Indicador de carga */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Cargando información de sus Resultados...</Text>
        </View>
      ) : resultados ? ( 
        // {/* Lista de Resultados */ }
        < FlatList
        data={resultados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.text}>
            <MaterialIcons name="event" size={16} /> Fecha de realización: {item.fechaRealizacion}
          </Text>
          <Text style={styles.text}>
            <MaterialIcons name="science" size={16} /> Examen realizado: {item.examen}
          </Text>
          <Text style={styles.text}>
            <FontAwesome5 name="notes-medical" size={16} /> Programa: {item.programa}
          </Text>
          <Text style={[styles.status, item.estado === "Disponible" ? styles.available : styles.pending]}>
            {item.estado}
          </Text>

          {/* Botón de Descargar si está disponible */}
          {item.estado === "Disponible" && (
            <TouchableOpacity style={styles.downloadButton} onPress={() => console.log(`Descargando ${item.examen}`)}>
              <MaterialIcons name="file-download" size={20} color="white" />
              <Text style={styles.downloadText}>Descargar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      />
      ) : (
      <Text style={styles.errorText}>No se pudo cargar la información de sus Resultados</Text>
    )}
    </View>
  );
};



export default ResultScreen;