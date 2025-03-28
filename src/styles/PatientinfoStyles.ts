import { StyleSheet } from "react-native";
import colors from "../themes/colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 20,
      paddingTop: 20,
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
    profileIconContainer: {
      alignItems: "center",
      margin: 40, 
    },
    infoContainer: {
      alignSelf: "center",
      backgroundColor: "#F5F5F5",
      padding: 15,
      borderRadius: 10,
      width: "95%",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
      color: "#333",
    },
    bold: {
      fontWeight: "bold",
      color: colors.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: colors.primary,
      fontWeight: "bold",
    },
    errorText: {
      textAlign: "center",
      fontSize: 16,
      color: "red",
      marginTop: 20,
    },
    containerLoading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      padding: 20,
      paddingTop: 20,
    },
  });

  export default styles;