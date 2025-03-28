;
export const framinghamSurvey = {
  id: 'framingham',
  nombre: 'Escala Framingham',
  descripcion: 'Estima el riesgo cardiovascular a 10 años.',
  requireIMC: false,
  requiereEdad: false,
  requiereSexo: false,
  preguntas: [
    {
      pregunta: '¿Fuma actualmente?',
      omitida: false,
      opciones: [
        { texto: 'Sí', valor: 2, sexo: null },
        { texto: 'No', valor: 0, sexo: null },
      ],
    },
    {
      pregunta: '¿Tiene diabetes?',
      omitida: false,
      opciones: [
        { texto: 'Sí', valor: 3, sexo: null },
        { texto: 'No', valor: 0, sexo: null },
      ],
    },
    {
      pregunta: '¿Cuál es su presión arterial sistólica (mmHg)?',
      omitida: false,
      opciones: [],
    },
    {
      pregunta: '¿Cuál es su colesterol total (mg/dL)?',
      omitida: false,
      opciones: [],
    },
    {
      pregunta: '¿Cuál es su nivel de HDL (colesterol bueno)?',
      omitida: false,
      opciones: [],
    },
  ],
    recomendaciones: [
      {
        min: 0,
        max: 4,
        texto: 'Riesgo bajo (<10%). Mantener estilo de vida saludable.',
        sexo: null,
      },
      {
        min: 5,
        max: 10,
        texto: 'Riesgo moderado (10–19%). Dieta DASH, control de presión, ejercicio frecuente.',
        sexo: null,
      },
      {
        min: 11,
        max: 100,
        texto: 'Riesgo alto (>20%). Control estricto, dieta baja en grasas, medicación posible.',
        sexo: null,
      },
    ],
};
