import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
//import colors from '../themes/colors';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/SelfCareStyles';
import SurveyCard from '../components/SurveyCard';

import SurveyForm from '../components/SurveyForm';
import { Image } from 'expo-image';
import { findriscSurvey } from '../data/findriscSurvey'; // Importamos la encuesta FINDRISC

type Props = NativeStackScreenProps<RootStackParamList, 'Autocuidado'>;

export type Survey = {
  id: string;
  nombre: string;
  descripcion: string;
  custom?: boolean;
  preguntas: (
    | string
    | {
        pregunta: string;
        opciones: { texto: string; valor: number }[];
      }
  )[];
};

  
  

const SelfCareScreen: React.FC<Props> = ({ navigation }) => {
  const [encuestas, setEncuestas] = useState<Survey[]>([
    findriscSurvey, // Incluimos la encuesta FINDRISC
    { id: '2', nombre: 'COULD IT BE COPD', descripcion: 'Evalúa síntomas de EPOC', preguntas: ['¿Tiene tos frecuente?', '¿Siente falta de aire?'] },
    { id: '3', nombre: 'Karnofsky Scale', descripcion: 'Evalúa el estado funcional', preguntas: ['¿Puede realizar tareas sin ayuda?', '¿Se siente fatigado?'] },
  ]);

  const [isSurveyFormVisible, setSurveyFormVisible] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);

  // 🔄 Navegar a la encuesta seleccionada
  const handleOpenSurvey = (survey: Survey) => {
    navigation.navigate('SurveyScreen', {
      surveyId: survey.id,
      preguntas: survey.preguntas,
    });
  };
  
  

  // 🔄 Agregar o Editar Encuesta Personalizada
  const handleAddSurvey = (newSurvey: Survey) => {
    if (editingSurvey) {
      setEncuestas(encuestas.map(s => s.id === editingSurvey.id ? newSurvey : s));
    } else {
      setEncuestas([...encuestas, { ...newSurvey, id: `custom-${Date.now()}`, custom: true }]);
    }
  };

  // 🔄 Solo encuestas personalizadas pueden editarse
  const handleEditSurvey = (survey: Survey) => {
    if (survey.custom) {
      setEditingSurvey(survey);
      setSurveyFormVisible(true);
    } else {
      Alert.alert("No editable", "Esta encuesta es fija y no puede editarse.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/icons8-trust.gif')} style={styles.imageSize} />
      </View>

      <Text style={styles.title}>Autocuidado</Text>

      <FlatList
        data={encuestas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SurveyCard
            survey={item}
            onPress={() => handleOpenSurvey(item)}
            onEdit={() => handleEditSurvey(item)}
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setSurveyFormVisible(true)}>
        <Text style={styles.addButtonText}>+ Crear Encuesta</Text>
      </TouchableOpacity>

      <SurveyForm
        visible={isSurveyFormVisible}
        onClose={() => {
          setSurveyFormVisible(false);
          setEditingSurvey(null);
        }}
        onSubmit={handleAddSurvey}
        editingSurvey={editingSurvey}
      />
    </View>
  );
};

export default SelfCareScreen;




























// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/AppNavigation';
// import colors from '../themes/colors';
// import { MaterialIcons } from '@expo/vector-icons';
// import styles from '../styles/SelfCareStyles';
// import SurveyCard from '../components/SurveyCard';
// import SurveyModal from '../components/SurveyModal';
// import SurveyForm from '../components/SurveyForm';
// import { Image } from 'expo-image';

// type Props = NativeStackScreenProps<RootStackParamList, 'Autocuidado'>;

// export type Survey = {
//     id: string;
//     nombre: string;
//     descripcion: string;
//     preguntas: string[];
// };

// const SelfCareScreen: React.FC<Props> = ({ navigation }) => {
//     const [encuestas, setEncuestas] = useState<Survey[]>([
//         { id: '1', nombre: 'COULD IT BE COPD', descripcion: 'Evalúa síntomas de EPOC', preguntas: ['¿Tiene tos frecuente?', '¿Siente falta de aire?'] },
//         { id: '2', nombre: 'Karnofsky Scale', descripcion: 'Evalúa el estado funcional', preguntas: ['¿Puede realizar tareas sin ayuda?', '¿Se siente fatigado?'] },
//     ]);

//     const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
//     const [isSurveyModalVisible, setSurveyModalVisible] = useState(false);
//     const [isSurveyFormVisible, setSurveyFormVisible] = useState(false);
//     const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);

//     const handleOpenSurvey = (survey: Survey) => {
//         setSelectedSurvey(survey);
//         setSurveyModalVisible(true);
//     };

//     const handleAddSurvey = (newSurvey: Survey) => {
//         if (editingSurvey) {
//             setEncuestas(encuestas.map(s => s.id === editingSurvey.id ? newSurvey : s));
//         } else {
//             setEncuestas([...encuestas, { ...newSurvey, id: (encuestas.length + 1).toString() }]);
//         }
//     };

//     const handleEditSurvey = (survey: Survey) => {
//         if (survey.id.startsWith('custom-')) { // Solo encuestas creadas pueden editarse
//           setEditingSurvey(survey);
//           setSurveyFormVisible(true);
//         }
//       };
      
//     const handleSurveyResponses = (surveyId: string, responses: string[]) => {
//         console.log(`Respuestas enviadas para la encuesta ${surveyId}:`, responses);
//         // 📌 Aquí puedes guardar las respuestas en Firebase si lo deseas
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                     <MaterialIcons name="arrow-back" size={24} color="white" />
//                 </TouchableOpacity>
//                 <Image source={require('../../assets/icons8-trust.gif')} style={styles.imageSize} />
//             </View>
//             <Text style={styles.title}>Autocuidado</Text>
//             <FlatList
//                 data={encuestas}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => <SurveyCard survey={item} onPress={() => handleOpenSurvey(item)} onEdit={() => handleEditSurvey(item)} />}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={() => setSurveyFormVisible(true)}>
//                 <Text style={styles.addButtonText}>+ Crear Encuesta</Text>
//             </TouchableOpacity>
//             <SurveyModal
//                 visible={isSurveyModalVisible}
//                 survey={selectedSurvey}
//                 onClose={() => setSurveyModalVisible(false)}
//                 onSubmitResponses={handleSurveyResponses}
//             />
//             <SurveyForm visible={isSurveyFormVisible} onClose={() => { setSurveyFormVisible(false); setEditingSurvey(null); }} onSubmit={handleAddSurvey} editingSurvey={editingSurvey} />
//         </View>
//     );
// };

// export default SelfCareScreen;
