export const findriscSurvey = {
  id: "findrisc",
  nombre: "Encuesta FINDRISC",
  descripcion: "Evalúa el riesgo de diabetes tipo 2",
  requiereEdad: true,
  requiereSexo: true,
  requireIMC: true,

  preguntas: [
    {
      pregunta: "Edad",
      omitida: false,
      opciones: [
        {texto: "Menos de 45 años", valor: 0, sexo: null},
        {texto: "Entre 45-54 años", valor: 2, sexo: null},
        {texto: "Entre 55-64 años", valor: 3, sexo: null},
        {texto: "Mas de 64 años", valor: 4, sexo: null},
      ],
    },
    {
      pregunta: "IMC (kg/m2)",
      requiredIMC: true,
      omitida: false,
      opciones: [
        {texto: "Menos de 25 kg/m2", valor: 0, sexo: null},
        {texto: "Entre 25-30 kg/m2", valor: 1, sexo: null},
        {texto: "Mas de 30 kg/m2", valor: 3, sexo: null},
      ],
    },
    {
      pregunta: "¿Cuál es su circunferencia de cintura?",
      omitida: false,
      opciones: [
        { texto: "< 94cm", valor: 0, sexo: "Masculino" },
        { texto: "94-102cm", valor: 3, sexo: "Masculino" },
        { texto: ">102cm", valor: 4, sexo: "Masculino" },
        { texto: "< 80cm", valor: 0, sexo: "Femenino" },
        { texto: "80-88cm", valor: 3, sexo: "Femenino" },
        { texto: ">88cm", valor: 4, sexo: "Femenino" },
      ],
    },
    {
      pregunta: "¿Tiene antecedentes familiares de diabetes?",
      omitida: false,
      opciones: [
        { texto: "No", valor: 0, sexo: null },
        { texto: "Sí: abuelo, tío o primo", valor: 3, sexo: null },
        { texto: "Sí: padre, madre, hermano", valor: 5, sexo: null },
      ],
    },
    {
      pregunta: "¿Realiza al menos 30 minutos de actividad física al día?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 0, sexo: null },
        { texto: "No", valor: 2, sexo: null },
      ],
    },
    {
      pregunta: "¿Con qué frecuencia consume frutas o verduras?",
      omitida: false,
      opciones: [
        { texto: "Diario", valor: 0, sexo: null },
        { texto: "Ocasional", valor: 1, sexo: null },
      ],
    },
    {
      pregunta: "¿Ha tomado medicamentos para la hipertensión?",
      omitida: false,
      opciones: [
        { texto: "No", valor: 0, sexo: null },
        { texto: "Sí", valor: 2, sexo: null },
      ],
    },
    {
      pregunta: "¿Se ha detectado niveles altos de glucosa en algún examen?",
      omitida: false,
      opciones: [
        { texto: "No", valor: 0, sexo: null },
        { texto: "Sí", valor: 5, sexo: null },
      ],

    },
  ],
    recomendaciones: [
      { min: 0, max: 6, texto: 'Riesgo bajo. Continúe con sus hábitos saludables.', sexo: null },
      { min: 7, max: 11, texto: 'Riesgo ligeramente elevado. Realice control periódico.', sexo: null },
      { min: 12, max: 14, texto: 'Riesgo moderado. Requiere cambios en estilo de vida.', sexo: null },
      { min: 15, max: 20, texto: 'Riesgo alto. Evaluación médica necesaria.', sexo: null },
      { min: 21, max: 26, texto: 'Riesgo muy alto. Remitir a especialista.', sexo: null }
    ],
    
};

