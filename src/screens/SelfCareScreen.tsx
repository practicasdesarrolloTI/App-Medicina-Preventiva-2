import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../themes/colors";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { findriscSurvey } from "../data/findriscSurvey";
import { lawtonBrodySurvey } from "../data/lawtonBrodySurvey";
import { framinghamSurvey } from "../data/fragmiganSurvey";
import { getPatientByDocument } from "../services/patientService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calcularEdad } from '../utils/dateUtils';
import { getSurveyResultsByDocument } from '../services/surveyResultService';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import SurveyCard from "../components/SurveyCard";


type ResultadoEncuesta = {
  surveyId: string;
  date: string; // en formato ISO
};

type EncuestaConEstado = Survey & {
  bloqueada?: boolean;
  mesesRestantes?: number;
  disponibleEn?: {
    meses: number;
    dias: number;
    horas: number;
  };
};

type Survey = {
  id: string;
  nombre: string;
  descripcion: string;
  preguntas: (
    | { omitida: any; pregunta: string; opciones: { texto: string; valor: number; sexo: any | null }[]; recomendaciones?: string }
    | { omitida: any; pregunta: string; opciones: { texto: string; valor: number; sexo: any | null }[]; recomendaciones?: string }
  )[];
  requiereEdad: boolean;
  requiereSexo: boolean;
  requiredIMC: boolean;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Autocuidado"
>;
type Paciente = {
  fecha_nacimiento: string;
  edad: number;
  sexo?: string;
};
const SelfCareScreen: React.FC = () => {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const [resultados, setResultados] = useState<ResultadoEncuesta[]>([]);
  const [encuestas, setEncuestas] = useState<Survey[]>([
    { ...findriscSurvey, requiereEdad: true, requiereSexo: true, requiredIMC: true },
    { ...lawtonBrodySurvey, requiereEdad: false, requiereSexo: false, requiredIMC: false },
    { ...framinghamSurvey, requiereEdad: true, requiereSexo: true, requiredIMC: false },
  ]);
  const [encuestasConEstado, setEncuestasConEstado] = useState<EncuestaConEstado[]>([]);

  const actualizarEncuestasConEstado = () => {
    const ahora = dayjs();
    const encuestasActualizadas = encuestas.map((encuesta) => {
      const resultado = resultados.find(r => r.surveyId === encuesta.id);
      if (resultado) {
        const fecha = dayjs(resultado.date);
        const expiracion = fecha.add(6, 'month');
        const diferenciaMs = expiracion.diff(ahora);

        if (diferenciaMs > 0) {
          const duracion = dayjs.duration(diferenciaMs);
          return {
            ...encuesta,
            bloqueada: true,
            disponibleEn: {
              meses: duracion.months(),
              dias: duracion.days(),
              horas: duracion.hours(),
            },
          };
        }
      }
      return encuesta;
    });
    setEncuestasConEstado(encuestasActualizadas);
  };


  const loadResultados = async () => {
    const storedDoc = await AsyncStorage.getItem('documento');
    if (!storedDoc) return;
    try {
      const data = await getSurveyResultsByDocument(storedDoc);
      setResultados(data as ResultadoEncuesta[]);
    } catch (error) {
      console.log("Error al obtener resultados previos:", error);
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
  };


  useEffect(() => {
    loadPatient();
    loadResultados();
  }, []);

  useEffect(() => {
    if (encuestas.length && resultados.length) {
      actualizarEncuestasConEstado();
    }
  }, [encuestas, resultados]);


  const handleOpenSurvey = (survey: Survey) => {
    if (!paciente) return;

    const resultado = resultados.find(r => r.surveyId === survey.id);
    if (resultado) {
      const fechaRespuesta = dayjs(resultado.date);
      const ahora = dayjs();
      const diferencia = ahora.diff(fechaRespuesta, 'month');

      if (diferencia < 6) {
        Alert.alert(
          'Encuesta bloqueada',
          `Ya realizaste esta encuesta hace menos de 6 meses. Inténtalo después de ${6 - diferencia} mes(es).`
        );
        return;
      }
    }

    const edad = calcularEdad(paciente.fecha_nacimiento);
    const sexo = paciente.sexo === 'M' ? 'Masculino' : 'Femenino';

    navigation.navigate("SurveyScreen", {
      surveyId: survey.id,
      preguntas: survey.preguntas,
      edad,
      sexo,
      survey,
    });
  };



  return (
    <View style={styles.container}>
      {/* Botón para regresar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={encuestasConEstado}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SurveyCard
            survey={{
              ...item,
              disponibleEn: item.bloqueada ? item.disponibleEn : undefined
            }}
            onPress={() => handleOpenSurvey(item)}
          />

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  header: {
    alignItems: "flex-start",
    padding: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  backButton: {
    top: 30,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default SelfCareScreen;