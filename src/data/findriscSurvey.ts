export const findriscSurvey = {
    id: "findrisc-001",
    nombre: "Encuesta FINDRISC",
    descripcion: "Evaluación del riesgo de desarrollar Diabetes Mellitus tipo 2",
    preguntas: [
      {
        pregunta: "¿Cuál es tu edad?",
        opciones: [
          { texto: "Menos de 45 años", valor: 0 },
          { texto: "45 - 54 años", valor: 2 },
          { texto: "55 - 64 años", valor: 3 },
          { texto: "Más de 64 años", valor: 4 },
        ],
      },
      {
        pregunta: "¿Cuál es tu índice de masa corporal (IMC)?",
        opciones: [
          { texto: "Menos de 25 kg/m²", valor: 0 },
          { texto: "25 - 30 kg/m²", valor: 1 },
          { texto: "Más de 30 kg/m²", valor: 3 },
        ],
      },
      {
        pregunta: "¿Cuál es la circunferencia de tu cintura?",
        opciones: [
          { texto: "Hombres: menos de 94 cm | Mujeres: menos de 80 cm", valor: 0 },
          { texto: "Hombres: 94-102 cm | Mujeres: 80-88 cm", valor: 3 },
          { texto: "Hombres: más de 102 cm | Mujeres: más de 88 cm", valor: 4 },
        ],
      },
      {
        pregunta: "¿Haces actividad física regularmente (al menos 30 minutos al día)?",
        opciones: [
          { texto: "Sí", valor: 0 },
          { texto: "No", valor: 2 },
        ],
      },
      {
        pregunta: "¿Con qué frecuencia consumes frutas, verduras y alimentos ricos en fibra?",
        opciones: [
          { texto: "Todos los días", valor: 0 },
          { texto: "No todos los días", valor: 1 },
        ],
      },
      {
        pregunta: "¿Tomas medicamentos para la hipertensión?",
        opciones: [
          { texto: "No", valor: 0 },
          { texto: "Sí", valor: 2 },
        ],
      },
      {
        pregunta: "¿Te han encontrado niveles elevados de glucosa en sangre en alguna ocasión?",
        opciones: [
          { texto: "No", valor: 0 },
          { texto: "Sí", valor: 5 },
        ],
      },
      {
        pregunta: "¿Tienes antecedentes familiares de diabetes (padres, hermanos, hijos)?",
        opciones: [
          { texto: "No", valor: 0 },
          { texto: "Sí, en parientes de segundo grado", valor: 3 },
          { texto: "Sí, en parientes de primer grado", valor: 5 },
        ],
      },
    ],
  };
  