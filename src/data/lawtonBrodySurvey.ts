export const lawtonBrodySurvey = {
  id: "lawtonbrody",
  nombre: "Encuesta LAWTON-BRODY",
  descripcion: "Evalúa el nivel de autonomía funcional en adultos mayores.",
  requiereEdad: false,
  requiereSexo: true,
  requiredIMC: false,

  preguntas: [
    {
      pregunta: "¿Usa el teléfono por iniciativa propia?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    },
    {
      pregunta: "¿Puede hacer compras sin ayuda?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    },
    {
      pregunta: "¿Prepara su comida de forma independiente?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    },
    {
      pregunta: "¿Mantiene la casa o participa activamente en su limpieza?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    },
    {
      pregunta: "¿Lava su ropa sin ayuda?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    },
    {
      pregunta: "¿Usa transporte público o maneja sin ayuda?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    },
    {
      pregunta: "¿Toma sus medicamentos correctamente?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    },
    {
      pregunta: "¿Administra su dinero sin ayuda?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "No", valor: 0, sexo: null }
      ]
    }
  ],

  calcularPuntaje: (respuestas: string[]) => {
    let puntaje = 0;
    respuestas.forEach((r) => {
      const val = parseInt(r);
      if (!isNaN(val)) puntaje += val;
    });
    return puntaje;
  },

  recomendaciones: [
    {
      min: 0,
      max: 2,
      texto: "Dependencia Total: Requiere asistencia en casi todas las actividades. Recomendado: cuidados domiciliarios o institucionales con fisioterapia, apoyo en movilidad y supervisión constante.",
      sexo: null
    },
    {
      min: 3,
      max: 4,
      texto: "Dependencia Moderada: Necesita apoyo en varias actividades. Recomendado: supervisión en medicación, tareas complejas, movilidad y monitoreo médico.",
      sexo: null
    },
    {
      min: 5,
      max: 6,
      texto: "Dependencia Leve: Puede realizar muchas actividades por sí solo. Recomendado: reforzar independencia con actividades físicas, mentales y apoyo ocasional.",
      sexo: null
    },
    {
      min: 7,
      max: 8,
      texto: "Independiente: Realiza todas las tareas sin ayuda. Recomendado: mantener rutina activa, chequeos médicos anuales y estimulación cognitiva.",
      sexo: null
    }
  ]
};
