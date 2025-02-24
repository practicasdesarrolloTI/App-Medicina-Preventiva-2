import { StyleSheet } from "react-native";
import Colors from "../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  imageSize: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    //color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: Colors.preto,
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.preto,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  pending: {
    backgroundColor: Colors.accent,
    color: Colors.white,
  },
  completed: {
    backgroundColor: Colors.green,
    color: Colors.white,
  },
  cancelled: {
    backgroundColor: Colors.red,
    color: Colors.white,
    borderRadius: 5,
  },
});

export default styles;
