import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { submitSurvey } from "../services/SurveyService";
import colors from "../themes/colors";
import { MaterialIcons } from "@expo/vector-icons";

type SurveySummaryProps = NativeStackScreenProps<
  RootStackParamList,
  "SurveySummary"
>;

const SurveySummary: React.FC<SurveySummaryProps> = ({ route, navigation }) => {
  const { surveyId, responses, puntaje, edad, sexo, survey } = route.params;

  const estatura = parseFloat(responses[0]);
  const peso = parseFloat(responses[1]);
  const imc = peso && estatura ? peso / (estatura * estatura) : NaN;

  const otrasRespuestas = responses.slice(2); // después de estatura/peso

  const obtenerRecomendacion = (): string => {
    if (!survey.recomendaciones) return "No hay recomendaciones definidas.";
  
    const recomendacionesFiltradas = survey.recomendaciones.filter(
      (r: any) =>
        (r.sexo?.toLowerCase?.() === sexo?.toLowerCase?.() || r.sexo === null)
    );
  
    const encontrada = recomendacionesFiltradas.find(
      (r: any) => puntaje >= r.min && puntaje <= r.max
    );
  
    return encontrada ? encontrada.texto : "Sin recomendación específica.";
  };
  
  const recomendacion = obtenerRecomendacion();
  

  const handleSubmit = async () => {
    const result = await submitSurvey(surveyId, responses);
    if (result.error) {
      Alert.alert("Error", result.error);
    } else {
      Alert.alert("Éxito", "Encuesta enviada correctamente");
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.response}>
          <Text style={styles.bold}>Puntaje total:</Text> {puntaje}
        </Text>
        <Text style={styles.response}>
          <Text style={styles.bold}>Recomendación:</Text> {recomendacion}
        </Text>

        <Text style={styles.title}>Resumen de Respuestas</Text>

        <View style={styles.summaryInfo}>
          <Text style={styles.response}>
            <Text style={styles.bold}>Edad:</Text> {edad}
          </Text>
          <Text style={styles.response}>
            <Text style={styles.bold}>Sexo:</Text> {sexo}
          </Text>
          <Text style={styles.response}>
            <Text style={styles.bold}>Estatura:</Text> {estatura} m
          </Text>
          <Text style={styles.response}>
            <Text style={styles.bold}>Peso:</Text> {peso} kg
          </Text>
          <Text style={styles.response}>
            <Text style={styles.bold}>IMC Calculado:</Text>{" "}
            {isNaN(imc) ? "N/A" : imc.toFixed(2)}
          </Text>

          {otrasRespuestas.map((res, i) => (
            <Text key={i} style={styles.response}>
              <Text style={styles.bold}>Pregunta {i + 1}:</Text> {res}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Encuesta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.white },
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
  summaryContainer: { flex: 1, alignItems: "center" },
  summaryInfo: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 10,
    width: "95%",
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: colors.primary,
  },
  response: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SurveySummary;



// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../navigation/AppNavigation";
// import { submitSurvey } from "../services/SurveyService";
// import colors from "../themes/colors";
// import { MaterialIcons } from "@expo/vector-icons";

// type SurveySummaryProps = NativeStackScreenProps<
//   RootStackParamList,
//   "SurveySummary"
// >;

// const SurveySummary: React.FC<SurveySummaryProps> = ({ route, navigation }) => {
//   const { surveyId, responses } = route.params;

//   const handleSubmit = async () => {
//     const result = await submitSurvey(surveyId, responses);
//     if (result.error) {
//       Alert.alert("Error", result.error);
//     } else {
//       Alert.alert("Éxito", "Encuesta enviada correctamente");
//       navigation.navigate("Home");
//     }
//   };

//   // 🔍 Procesar respuestas
//   const edad = responses[0];
//   const sexo = responses[1];
//   const estatura = parseFloat(responses[2]);
//   const peso = parseFloat(responses[3]);
//   const imc = peso && estatura ? peso / (estatura * estatura) : NaN;

//   const otrasRespuestas = responses.slice(4);

//   const calcularPuntajeTotal = (): number => {
//     return otrasRespuestas.reduce((acc, val) => {
//       const num = parseInt(val);
//       return acc + (isNaN(num) ? 0 : num);
//     }, 0);
//   };

//   const obtenerRecomendacion = (puntaje: number): string => {
//     if (puntaje >= 15) return "Riesgo muy alto. Requiere atención médica urgente.";
//     if (puntaje >= 12) return "Riesgo alto. Se recomienda evaluación médica.";
//     if (puntaje >= 7) return "Riesgo moderado. Adopte hábitos saludables.";
//     return "Riesgo leve. Continúe con hábitos saludables.";
//   };

//   const puntajeTotal = calcularPuntajeTotal();
//   const recomendacion = obtenerRecomendacion(puntajeTotal);


//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <MaterialIcons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.summaryContainer}>

//         <Text style={styles.response}>
//           <Text style={styles.bold}>Puntaje total:</Text> {puntajeTotal}
//         </Text>
//         <Text style={styles.response}>
//           <Text style={styles.bold}>Recomendación:</Text> {recomendacion}
//         </Text>

//         <Text style={styles.title}>Resumen de Respuestas</Text>

//         <View style={styles.summaryInfo}>
//           <Text style={styles.response}>
//             <Text style={styles.bold}>Edad:</Text> {edad}
//           </Text>
//           <Text style={styles.response}>
//             <Text style={styles.bold}>Sexo:</Text> {sexo}
//           </Text>
//           <Text style={styles.response}>
//             <Text style={styles.bold}>Estatura:</Text> {estatura} m
//           </Text>
//           <Text style={styles.response}>
//             <Text style={styles.bold}>Peso:</Text> {peso} kg
//           </Text>
//           <Text style={styles.response}>
//             <Text style={styles.bold}>IMC Calculado:</Text>{" "}
//             {isNaN(imc) ? "N/A" : imc.toFixed(2)}
//           </Text>

//           {otrasRespuestas.map((res, i) => (
//             <Text key={i} style={styles.response}>
//               <Text style={styles.bold}>Pregunta {i + 1}:</Text> {res}
//             </Text>
//           ))}
//         </View>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Enviar Encuesta</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingTop: 20,
//     backgroundColor: colors.white,
//   },
//   header: {
//     alignItems: "flex-start",
//     padding: 15,
//     marginTop: 30,
//     marginBottom: 20,
//   },
//   backButton: {
//     top: 30,
//     backgroundColor: colors.primary,
//     padding: 10,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 5,
//   },
//   summaryContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   summaryInfo: {
//     alignSelf: "center",
//     backgroundColor: colors.background,
//     padding: 15,
//     borderRadius: 10,
//     width: "95%",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: colors.primary,
//   },
//   response: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   bold: {
//     fontWeight: "bold",
//     color: colors.primary,
//   },
//   button: {
//     backgroundColor: colors.primary,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: colors.white,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default SurveySummary;