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
//   const { surveyId, responses, puntaje, edad, sexo, survey } = route.params;

//   const estatura = parseFloat(responses[0]);
//   const peso = parseFloat(responses[1]);
//   const imc = peso && estatura ? peso / (estatura * estatura) : NaN;

//   const otrasRespuestas = responses.slice(2); // después de estatura/peso

//   const obtenerRecomendacion = (): string => {
//     if (!survey.recomendaciones) return "No hay recomendaciones definidas.";
  
//     const recomendacionesFiltradas = survey.recomendaciones.filter(
//       (r: any) =>
//         (r.sexo?.toLowerCase?.() === sexo?.toLowerCase?.() || r.sexo === null)
//     );
  
//     const encontrada = recomendacionesFiltradas.find(
//       (r: any) => puntaje >= r.min && puntaje <= r.max
//     );
  
//     return encontrada ? encontrada.texto : "Sin recomendación específica.";
//   };
  
//   const recomendacion = obtenerRecomendacion();
  

//   const handleSubmit = async () => {
//     const result = await submitSurvey(surveyId, responses);
//     if (result.error) {
//       Alert.alert("Error", result.error);
//     } else {
//       Alert.alert("Éxito", "Encuesta enviada correctamente");
//       navigation.navigate("Home");
//     }
//   };

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
//           <Text style={styles.bold}>Puntaje total:</Text> {puntaje}
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
//   container: { flex: 1, padding: 20, backgroundColor: colors.white },
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
//   summaryContainer: { flex: 1, alignItems: "center" },
//   summaryInfo: {
//     backgroundColor: colors.background,
//     padding: 15,
//     borderRadius: 10,
//     width: "95%",
//     elevation: 3,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 15,
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


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import colors from '../themes/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'SurveySummary'>;

const SurveySummary: React.FC<Props> = ({ route, navigation }) => {
  const { surveyId, responses, puntaje, edad, sexo, survey } = route.params;

  const estatura = parseFloat(responses[0]);
  const peso = parseFloat(responses[1]);
  const imc = peso && estatura ? peso / (estatura * estatura) : NaN;

  const getRecomendacion = () => {
    if (!survey?.recomendaciones) return '';
    const recomendacion = survey.recomendaciones.find((rec: any) => {
      const sexoMatch = rec.sexo === null || rec.sexo?.toLowerCase() === sexo.toLowerCase();
      return rec.min <= puntaje && puntaje <= rec.max && sexoMatch;
    });
    return recomendacion?.texto || 'No se encontró recomendación.';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen de la Encuesta</Text>

      <Text style={styles.label}>Encuesta:</Text>
      <Text style={styles.value}>{survey?.nombre || 'Desconocida'}</Text>

      <Text style={styles.label}>Edad:</Text>
      <Text style={styles.value}>{edad} años</Text>

      <Text style={styles.label}>Sexo:</Text>
      <Text style={styles.value}>{sexo}</Text>

      <>
        <Text style={styles.label}>IMC:</Text>
        <Text style={styles.value}>{isNaN(imc) ? 'No disponible' : imc.toFixed(2)}</Text>
      </>

      <Text style={styles.label}>Respuestas:</Text>
      {responses.map((resp, idx) => (
        <Text key={idx} style={styles.response}>• {resp}</Text>
      ))}

      <Text style={styles.label}>Puntaje Total:</Text>
      <Text style={styles.value}>{puntaje}</Text>

      <Text style={styles.label}>Recomendación:</Text>
      <Text style={styles.recommendation}>{getRecomendacion()}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SurveySummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  value: {
    marginBottom: 8,
    fontSize: 16,
    color: '#555',
  },
  response: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  recommendation: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 8,
    color: '#222',
  },
  backButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
