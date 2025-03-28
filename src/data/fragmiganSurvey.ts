export const framinghamSurvey = {
  id: 'framingham',
  nombre: 'Escala Framingham',
  descripcion: 'Estima el riesgo cardiovascular a 10 años.',
  requireIMC: false,
  requiereEdad: true,
  requiereSexo: true,
  preguntas: [
    {
      pregunta: '¿Tiene diabetes?',
      omitida: false,
      opciones: [
        { texto: 'Sí', valor: 2, sexo: "Masculino" },
        { texto: 'Sí', valor: 4, sexo: "Femenino" },
        { texto: 'No', valor: 0, sexo: null },
      ],
    },
    {
      pregunta: '¿Fuma actualmente?',
      omitida: false,
      opciones: [
        { texto: 'Sí', valor: 2, sexo: null },
        { texto: 'No', valor: 0, sexo: null },
      ],
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
    {
      pregunta: '¿Cuál es su presión arterial sistólica (mmHg)?',
      omitida: false,
      opciones: [],
    },
  ],
  calcularPuntaje: (respuestas: string[], edad: number, sexo: string) => {
    const sexoL = sexo.toLowerCase();
    const isMale = sexoL === 'masculino';

    let puntaje = 0;

    // Edad
    if (edad >= 30 && edad <= 34) puntaje += isMale ? -1 : -9;
    else if (edad <= 39) puntaje += isMale ? 0 : -4;
    else if (edad <= 44) puntaje += isMale ? 1 : 0;
    else if (edad <= 49) puntaje += isMale ? 2 : 3;
    else if (edad <= 54) puntaje += isMale ? 3 : 6;
    else if (edad <= 59) puntaje += isMale ? 4 : 7;
    else if (edad <= 64) puntaje += isMale ? 5 : 8;
    else if (edad <= 69) puntaje += isMale ? 6 : 8;
    else if (edad <= 74) puntaje +=  isMale ? 7 : 8;
    else puntaje += 0;
    

    const diabetes = respuestas[0];
    puntaje += diabetes ? (isMale ? 2 : 4) : 0;

    const fumador = respuestas[1];
    puntaje += fumador ? 2 : 0;

    // Colesterol total (respuesta[2])
    const colesterol = parseFloat(respuestas[2]);
    if (!isNaN(colesterol)) {
      if (colesterol < 160) puntaje += isMale ? -3 : -2;
      else if (colesterol < 200) puntaje += 0;
      else if (colesterol < 240) puntaje += 1;
      else if (colesterol < 280) puntaje += isMale ? 2 : 1;
      else puntaje += 3;
    }

    const hdl = parseFloat(respuestas[3]);
    if (!isNaN(hdl)) {
      if (hdl < 35) puntaje += isMale ? 2 : 5;
      else if (hdl <= 44) puntaje += isMale ? 1 : 2;
      else if (hdl <= 49) puntaje += isMale ? 0 : 1;
      else if (hdl <= 59) puntaje += isMale ? 0 : 0;
      else puntaje += isMale ? -2 : -3;
    }

    // Presión Arterial (respuesta[4] y [5])
    const sistolica = parseFloat(respuestas[4]);
    const diastolica = parseFloat(respuestas[5]);

    const calcularPresionPuntaje = () => {
      const sist = isNaN(sistolica) ? 0 : sistolica;
      const diast = isNaN(diastolica) ? 0 : diastolica;
      const valor = Math.max(sist, diast);
    
      if (sexo.toLowerCase() === "masculino") {
        if (valor < 120) return 0;
        if (valor <= 129) return 0;
        if (valor <= 139) return 1;
        if (valor <= 159) return 2;
        return 3;
      } else if (sexo.toLowerCase() === "femenino") {
        if (valor < 120) return 3;
        if (valor <= 129) return 2;
        if (valor <= 139) return 1;
        if (valor <= 159) return 0;
        return 0;
      }
    
      return 0; // En caso de datos incompletos o sexo no definido
    };    

    puntaje += calcularPresionPuntaje();

    return puntaje;
  },

  recomendaciones: [
    { min: -2, max: -1, texto: 'Riesgo bajo (1-2%)', sexo: null },
    { min: 0, max: 1, texto: 'Riesgo bajo (3-4%)', sexo: null },
    { min: 2, max: 3, texto: 'Riesgo moderado (5-7%)', sexo: null },
    { min: 4, max: 5, texto: 'Riesgo moderado-alto (8-10%)', sexo: null },
    { min: 6, max: 7, texto: 'Riesgo alto (13-20%)', sexo: null },
    { min: 8, max: 9, texto: 'Riesgo muy alto (25-31%)', sexo: null },
    { min: 10, max: 11, texto: 'Riesgo extremo (37-45%)', sexo: null },
    { min: 12, max: 13, texto: 'Riesgo crítico (>53%)', sexo: null },
    { min: 14, max: 20, texto: 'Riesgo >53%', sexo: null },
  ],
};
