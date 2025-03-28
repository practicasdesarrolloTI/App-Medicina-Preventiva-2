export const lawtonBrodySurvey = {
  id: "lawton_brody",
  nombre: "Escala Lawton-Brody",
  descripcion: "Evalúa habilidades funcionales del adulto mayor",
  requiereEdad: false,
  requiereSexo: false,
  requireIMC: false,
  preguntas: [
    {
      pregunta: "¿Puede usar el teléfono sin ayuda?",
      omitida: false,
      opciones: [
        { texto: "Completamente capaz", valor: 1, sexo: null },
        { texto: "Capaz solo para números conocidos", valor: 0.5, sexo: null },
        { texto: "Incapaz de usarlo", valor: 0, sexo: null },
      ],
    },
    {
      pregunta: "¿Puede hacer sus compras sin ayuda?",
      omitida: false,
      opciones: [
        { texto: "Totalmente independiente", valor: 1, sexo: null },
        { texto: "Necesita algo de ayuda", valor: 0.5, sexo: null },
        { texto: "Dependiente", valor: 0, sexo: null },
      ],
    },
    {
      pregunta: "¿Es capaz de preparar sus comidas?",
      omitida: false,
      opciones: [
        { texto: "Sí", valor: 1, sexo: null },
        { texto: "Con asistencia", valor: 0.5, sexo: null },
        { texto: "No", valor: 0, sexo: null },
      ],
    }
  ],
};