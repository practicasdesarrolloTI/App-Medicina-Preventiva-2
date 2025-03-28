import axios from 'axios';
import { PacienteBackend } from '../types/PacienteBackend';

const API_URL = 'http://10.0.2.2:3001/api/paciente';

// export const getPatientByDocument = async (documento: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/${documento}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener información del paciente:", error);
//     throw error;
//   }
// };

export const getPatientByDocument = async (documento: string): Promise<PacienteBackend | null> => {
  try {
    const response = await axios.get<PacienteBackend>(`${API_URL}/${documento}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
interface PatientData {
  documento: string;
}

export const checkPatientExists = async (documento: string): Promise<boolean> => {
  try {
    const response = await axios.get<PatientData>(`${API_URL}/${documento}`);
    return !!response.data && response.data.documento === documento;
  } catch (error) {
    return false;
  }
};
