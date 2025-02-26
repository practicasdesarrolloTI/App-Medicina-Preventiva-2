import Colors from "../themes/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.background,
    },
    header: {
      alignItems: "flex-start",
      padding: 15,
      marginTop: 30,
      marginBottom: 40, 
    },
    backButton: {
      top: 30,
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
    },
    card: {
      backgroundColor: "#F5F5F5",
      padding: 20,
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    text: {
      fontSize: 18,
      marginBottom: 5,
      color: "#333",
    },
    status: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      padding: 5,
      borderRadius: 5,
      marginTop: 10,
      borderWidth: 2,
      borderColor: Colors.preto,
    },
    available: {
      backgroundColor: "green",
      color: "#fff",
    },
    pending: {
      backgroundColor: Colors.secondary,
      color: "#fff",
    },
    downloadButton: {
      marginTop: 10,
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    downloadText: {
      color: "white",
      fontSize: 16,
      marginLeft: 8,
    },
  });

  export default styles;