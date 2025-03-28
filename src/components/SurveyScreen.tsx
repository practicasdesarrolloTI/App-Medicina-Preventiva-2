import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import colors from "../themes/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

type SurveyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SurveyScreen"
>;

type Opcion = {
  texto: string;
  valor: number;
  sexo?: "Masculino" | "Femenino";
};

type Pregunta =
  | string
  | {
      pregunta: string;
      opciones?: Opcion[];
      omitida?: boolean;
    };

const SurveyScreen: React.FC<SurveyScreenProps> = ({ route }) => {
  const { preguntas, surveyId, edad, sexo, survey } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>("");

  // 🔍 Filtrar preguntas omitidas
  let finalPreguntas = preguntas.filter((q) => {
    if (typeof q === "string") return true;
    return !q.omitida;
  });

  // ✅ Insertar preguntas de estatura/peso si se requiere IMC
  if (survey.requiereEdad) {
    finalPreguntas = [
      { pregunta: "¿Cuál es tu estatura en metros?", opciones: [], omitida: false },
      { pregunta: "¿Cuál es tu peso en kilogramos?", opciones: [], omitida: false },
      ...finalPreguntas,
    ];
  }

  const handleNext = () => {
    if (responses[currentIndex] === undefined || responses[currentIndex] === "") {
      Alert.alert("Error", "Por favor responde antes de continuar.");
      return;
    }

    if (currentIndex < finalPreguntas.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(responses[currentIndex + 1] || "");
    } else {
      // Si ya estamos en la última pregunta
      const puntajeTotal = responses
        .filter((r) => typeof r === "number")
        .reduce((acc, val) => acc + val, 0);

      navigation.navigate("SurveySummary", {
        surveyId,
        responses,
        puntaje: puntajeTotal,
        edad,
        sexo,
        survey,
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(responses[currentIndex - 1] || "");
    }
  };

  const handleResponseChange = (respuesta: string | number) => {
    const updated = [...responses];
    updated[currentIndex] = respuesta;
    setResponses(updated);
    setSelectedOption(respuesta);
  };

  const renderQuestion = () => {
    const currentQuestion = finalPreguntas[currentIndex];

    // Si la pregunta es de tipo texto
    if (!currentQuestion.opciones || currentQuestion.opciones.length === 0) {
      return (
        <>
          <Text style={styles.question}>{currentQuestion.pregunta}</Text>
          <TextInput
            style={styles.input}
            value={String(responses[currentIndex] || "")}
            onChangeText={(text) => handleResponseChange(text)}
            placeholder="Escribe tu respuesta"
            keyboardType="decimal-pad"
          />
        </>
      );
    }

    // Si es una pregunta con opciones
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestion.pregunta}</Text>
        {currentQuestion.opciones
          .filter(
            (op) =>
              !op.sexo || op.sexo.toLowerCase() === sexo.toLowerCase()
          )
          .map((op, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === op.valor && styles.selectedOption,
              ]}
              onPress={() => handleResponseChange(op.valor)}
            >
              <Text style={styles.optionText}>{op.texto}</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {renderQuestion()}

      <View style={styles.buttonContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={styles.previousButton}
            onPress={handlePrevious}
          >
            <Text style={styles.previousButtonText}>Anterior</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex < finalPreguntas.length - 1
              ? "Siguiente"
              : "Finalizar"}
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  questionContainer: { flex: 1, justifyContent: "center" },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  optionButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  previousButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "45%",
  },
  previousButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "45%",
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SurveyScreen;



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import colors from "../themes/colors";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../navigation/AppNavigation";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { MaterialIcons } from "@expo/vector-icons";

// type SurveyScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   "SurveyScreen"
// >;

// type Pregunta =
//   | string
//   | {
//       pregunta: string;
//       opciones: {
//         texto: string;
//         valor: number;
//         sexo?: "Masculino" | "Femenino";
//       }[];
//     };

// const SurveyScreen: React.FC<SurveyScreenProps> = ({ route }) => {
//   const { preguntas, surveyId, edad, sexo, survey } = route.params;
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState<string[]>([]);
//   const [selectedOption, setSelectedOption] = useState<string>("");

//   let finalPreguntas = preguntas.filter((q) => {
//     if (typeof q === "string") return !q.toLowerCase().includes("edad");
//     return q.pregunta.toLowerCase() !== "¿cuál es tu imc calculado?";
//   });

//   // Insertamos preguntas de estatura y peso si se requiere edad
//   if (survey.requiereEdad) {
//     finalPreguntas = [
//       "¿Cuál es tu estatura en metros?",
//       "¿Cuál es tu peso en kilogramos?",
//       ...finalPreguntas,
//     ];
//   }

//   const handleNext = () => {
//     if (!responses[currentIndex]) {
//       Alert.alert(
//         "Error",
//         "Por favor, responde la pregunta antes de continuar."
//       );
//       return;
//     }

//     if (currentIndex < finalPreguntas.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setSelectedOption(responses[currentIndex + 1] || "");
//     } else {
//       const finalResponses = [
//         ...(survey.requiereEdad ? [String(edad)] : []),
//         ...(survey.requiereSexo ? [sexo] : []),
//         ...responses,
//       ];
//       navigation.navigate("SurveySummary", {
//         surveyId,
//         responses: finalResponses,
//       });
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//       setSelectedOption(responses[currentIndex - 1] || "");
//     }
//   };

//   const handleResponseChange = (text: string) => {
//     const updated = [...responses];
//     updated[currentIndex] = text;
//     setResponses(updated);
//     setSelectedOption(text);
//   };

//   const renderQuestion = () => {
//     const currentQuestion = finalPreguntas[currentIndex];

//     if (
//       typeof currentQuestion === "string" ||
//       (typeof currentQuestion === "object" &&
//         currentQuestion.opciones.length === 0)
//     ) {
//       return (
//         <>
//           <Text style={styles.question}>
//             {typeof currentQuestion === "string"
//               ? currentQuestion
//               : currentQuestion.pregunta}
//           </Text>
//           <TextInput
//             style={styles.input}
//             value={responses[currentIndex]}
//             onChangeText={handleResponseChange}
//             placeholder="Escribe tu respuesta"
//             keyboardType="decimal-pad"
//           />
//         </>
//       );
//     }

//     return (
//       <View style={styles.questionContainer}>
//         <Text style={styles.question}>{currentQuestion.pregunta}</Text>
//         {currentQuestion.opciones
//           .filter(
//             (op) =>
//               !op.sexo || // si no tiene restricción de sexo
//               op.sexo.toLowerCase() === sexo.toLowerCase()
//           )
//           .map((op, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.optionButton,
//                 selectedOption === op.texto && styles.selectedOption,
//               ]}
//               onPress={() => handleResponseChange(op.texto)}
//             >
//               <Text style={styles.optionText}>{op.texto}</Text>
//             </TouchableOpacity>
//           ))}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <MaterialIcons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {renderQuestion()}

//       <View style={styles.buttonContainer}>
//         {currentIndex > 0 && (
//           <TouchableOpacity
//             style={styles.previousButton}
//             onPress={handlePrevious}
//           >
//             <Text style={styles.previousButtonText}>Anterior</Text>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//           <Text style={styles.nextButtonText}>
//             {currentIndex < finalPreguntas.length - 1
//               ? "Siguiente"
//               : "Finalizar"}
//           </Text>
//         </TouchableOpacity>
//       </View>
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
//     backgroundColor: colors.primary,
//     padding: 10,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 5,
//   },
//   questionContainer: { flex: 1, justifyContent: "center" },
//   question: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: colors.lightGray,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//   },
//   optionButton: {
//     padding: 12,
//     marginVertical: 5,
//     backgroundColor: colors.secondary,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   selectedOption: {
//     backgroundColor: colors.primary,
//   },
//   optionText: {
//     color: colors.white,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   previousButton: {
//     backgroundColor: colors.secondary,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     width: "45%",
//   },
//   previousButtonText: {
//     color: colors.white,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   nextButton: {
//     backgroundColor: colors.primary,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     width: "45%",
//   },
//   nextButtonText: {
//     color: colors.white,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default SurveyScreen;