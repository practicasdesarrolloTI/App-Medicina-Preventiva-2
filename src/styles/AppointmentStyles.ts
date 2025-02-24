import { StyleSheet } from 'react-native';
import Colors from '../themes/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.background,
      alignContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    card: {
      backgroundColor: Colors.background,
      padding: 20,
      borderRadius: 8,
      marginBottom: 15,
      shadowColor: '#000',
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
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
      borderRadius: 5,
      marginTop: 10,
    },
    pending: {
      backgroundColor: Colors.secondary,
      color: '#fff',
    },
    completed: {
      backgroundColor: Colors.primary,
      color: '#fff',
    },
    imageSize: {
        width: 50,
        height: 50,
      },
      header: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      closeButton: {
        padding: 10,
      },
  });

  export default styles;