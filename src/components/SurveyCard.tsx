import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../themes/colors";

type Props = {
  survey: {
    nombre: string;
    descripcion: string;
    bloqueada?: boolean;
  };
  tiempoRestante?: {
    porcentajeCompletado: number;
    meses: number;
    dias: number;
    horas: number;
    minutos?: number;
    segundos: number;
  };
  onPress: () => void;
};

const SurveyCard: React.FC<Props> = ({ survey, tiempoRestante, onPress }) => {
  const [showModal, setShowModal] = useState(false);

  const getTiempoDisponibleEn = () => {
    if (!tiempoRestante) return "";

    const partes = [];
    if (tiempoRestante.meses > 0)
      partes.push(`${tiempoRestante.meses} mes${tiempoRestante.meses === 1 ? "" : "es"}`);
    if (tiempoRestante.dias > 0)
      partes.push(`${tiempoRestante.dias} día${tiempoRestante.dias === 1 ? "" : "s"}`);
    if (tiempoRestante.horas > 0)
      partes.push(`${tiempoRestante.horas} hora${tiempoRestante.horas === 1 ? "" : "s"}`);
    if (tiempoRestante.minutos && tiempoRestante.minutos > 0)
      partes.push(`${tiempoRestante.minutos} min`);
    if (tiempoRestante.segundos > 0) {
      partes.push(`${tiempoRestante.segundos} segundo${tiempoRestante.segundos === 1 ? "" : "s"}`);
    }

    return partes.join(", ");
  };

  const handlePress = () => {
    if (survey.bloqueada) {
      setShowModal(true);
    } else {
      onPress();
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.card,
          survey.bloqueada && { backgroundColor: "#e0e0e0", opacity: 0.7 },
        ]}
        activeOpacity={survey.bloqueada ? 1 : 0.7}
      >
        <Text style={styles.text}>
          <FontAwesome5 name="clipboard-list" size={16} /> {survey.nombre}
        </Text>
        <Text style={styles.description}>{survey.descripcion}</Text>

        {survey.bloqueada ? (
          <>
            <Text style={styles.disabledText}>
              Disponible en {getTiempoDisponibleEn()}
            </Text>

            {/* Barra de progreso visual */}
            {tiempoRestante && (
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: tiempoRestante.porcentajeCompletado * 100 },
                  ]}
                />
              </View>
            )}
          </>
        ) : (
          <View style={styles.startButton}>
            <Text style={styles.buttonText}>Iniciar</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Encuesta bloqueada</Text>
            <Text style={styles.modalText}>
              Esta encuesta ya fue completada. Podrás volver a realizarla en{" "}
              {getTiempoDisponibleEn()}.
            </Text>

            {/* Barra de progreso fuera del <Text> */}
            {survey.bloqueada && tiempoRestante && (
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: tiempoRestante.porcentajeCompletado * 100 },
                  ]}
                />
              </View>
            )}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: colors.lightGray,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledText: {
    fontSize: 14,
    color: colors.preto,
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: colors.preto,
  },
  modalButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginTop: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

});

export default SurveyCard;
