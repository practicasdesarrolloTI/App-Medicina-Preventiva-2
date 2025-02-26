import { StyleSheet } from "react-native";
import Colors from "../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    alignContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
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
  pending: {
    backgroundColor: Colors.secondary,
    color: "#fff",
  },
  completed: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  imageSize: {
    marginTop: 20,
    width: 50,
    height: 50,
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
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
  closeButton: {
    padding: 10,
  },
});

export default styles;
