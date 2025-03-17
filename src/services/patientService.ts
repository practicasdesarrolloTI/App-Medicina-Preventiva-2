import { get } from './api';

export const fetchPatient = async () => {
  return await get('patient');
};
