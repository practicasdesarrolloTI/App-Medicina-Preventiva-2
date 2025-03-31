import axios from "axios";

const API_URL = "http://10.20.15.237:5000/api";



// export const submitSurvey = async (surveyId: string, responses: string[]) => {
//   try {
//     const response = await fetch(`${API_URL}/submit`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ surveyId, responses }),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Error al enviar la encuesta");

//     return data;
//   } catch (error: any) {
//     return { error: error.message };
//   }
// };

// export const fetchAllSurveys = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };