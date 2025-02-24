import { StyleSheet } from 'react-native';
import Colors from '../themes/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 5,
      width: '80%',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    link: {
      marginTop: 10,
      color: Colors.secondary,
    },
    image: {
      width: 550,
      height: 159,
    },
  });

export default styles;