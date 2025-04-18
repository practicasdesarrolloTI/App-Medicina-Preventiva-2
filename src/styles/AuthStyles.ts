import { StyleSheet } from "react-native";
import colors from "../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.lightGray,
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.primary,
    fontFamily: 'lucida grande',
  },
  input: {
    marginBottom: 10,
    color: colors.gray
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.primary,
  },
  link: {
    marginTop: 10,
    color: colors.secondary,
  },
  picker: {
    width: "100%",
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    borderWidth: 10,
    borderRadius: 5,
    //marginBottom: 10,
  },
});

export default styles;
