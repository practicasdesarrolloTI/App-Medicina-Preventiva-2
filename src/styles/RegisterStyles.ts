import { StyleSheet } from "react-native";
import colors from "../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.white,
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
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;













// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         width: '80%',
//         height: 40,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         marginBottom: 10,
//     },
//     button: {
//         backgroundColor: '#007AFF',
//         padding: 10,
//         borderRadius: 5,
//         width: '80%',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     link: {
//         marginTop: 10,
//         color: '#007AFF',
//     },
// });

// export default styles;
