const API_URL = 'http://10.0.2.2:8000/api';

export const getPatientIndicators = async (tipoDocumento: string, documento: string) => {
  try {
    const response = await fetch(`${API_URL}/pacientes/indicadores/${tipoDocumento}/${documento}`);
    const data = await response.json();
    return data[0]; // viene como array con un solo objeto
  } catch (error) {
    console.error('Error al obtener indicadores del paciente:', error);
    return null;
  }
};
