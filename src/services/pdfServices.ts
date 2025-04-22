import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const API_URL = 'http://10.0.2.2:8000/api'; 

export const downloadMedicamentsOrder = async (tipoDocumento: string, numeroDocumento: string) => {
  try {
    const fileUri = FileSystem.documentDirectory + `orden_medicamentos_${numeroDocumento}.pdf`;

    const response = await FileSystem.downloadAsync(
      `${API_URL}/orden-medicamentos/${tipoDocumento}/${numeroDocumento}`,
      fileUri
    );

    if (response.status != 200) throw new Error('Error al descargar el PDF');

    // Abre el archivo usando el visor o para compartir
    await Sharing.shareAsync(response.uri);

  } catch (error) {
    console.error('Error descargando la orden de medicamentos:', error);
    throw error;
  }
};
