import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api';

// Obtener indicadores clínicos más recientes por paciente

export const getIndicadores = async (documento: string) => {
  const res = await axios.get(`${API_URL}/pacientes/indicadores/${documento}`);
  return res.data;
};

// Obtener citas por paciente
export const getCitasPorPaciente = async (tipo: string, documento: string) => {
  const res = await axios.get(`${API_URL}/citas/${tipo}/${documento}`);
  return res.data;
};

// Obtener citas pendientes
export const getProgramas = async (tipo: string, documento: string) => {
  const res = await axios.get(`${API_URL}/programas/${tipo}/${documento}`);
  return res.data;
};

// Obtener exámenes por paciente
export const getExamenes = async (documento: string) => {
  const res = await axios.get(`${API_URL}/examenes/${documento}`);
  return res.data;
};

// Obtener citas generales (sin filtro)
export const getTodasLasCitas = async () => {
  const res = await axios.get(`${API_URL}/citas`);
  return res.data;
};

// Obtener medicamentos por paciente (tipo + documento)
export const getMedicamentos = async (tipo: string, documento: string) => {
  const res = await axios.get(`${API_URL}/medicamentos/${tipo}/${documento}`);
  return res.data;
};
