import { StyleSheet } from "react-native";
import colors from "../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
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
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  imageSize: {
    marginTop: 20,
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: colors.preto,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.preto,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 2,
    borderColor: colors.preto,
  },
  pending: {
    backgroundColor: colors.secondary,
    color: colors.white,
  },
  reformulated: {
    backgroundColor: colors.secondary,
    color: colors.white,
  },
  downloaded: {
    backgroundColor: colors.green,
    color: colors.white,
  },
});

export default styles;
