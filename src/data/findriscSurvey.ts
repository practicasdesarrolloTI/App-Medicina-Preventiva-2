export const findriscSurvey = {
  id: "findrisc",
  nombre: "Encuesta FINDRISC",
  descripcion: "Evalúa el riesgo de diabetes tipo 2",
  requiereEdad: true,
  requiereSexo: true,
  requireIMC: true,

  calcularPuntaje: (respuestas: any[], edad: number, sexo: string) => {
    let puntaje = 0;
  
    // Edad (según FINDRISC)
    if (edad < 45) {
      puntaje += 0;
    } else if (edad >= 45 && edad <= 54) {
      puntaje += 2;
    } else if (edad >= 55) {
      puntaje += 3;
    }
  
    // ✅ IMC (índice de masa corporal)
    const estatura = parseFloat(respuestas[0]);
    const peso = parseFloat(respuestas[1]);
    const imc = peso && estatura ? peso / (estatura * estatura) : 0;
  
    if (imc >= 25 && imc <= 30) {
      puntaje += 1;
    } else if (imc > 30) {
      puntaje += 3;
    }
  
    // Circunferencia abdominal (pregunta con opciones)
    puntaje += Number(respuestas[2] || 0);
  
    //  Actividad física
    puntaje += Number(respuestas[3] || 0);
  
    //  Consumo de frutas y vegetales
    puntaje += Number(respuestas[4] || 0);
  
    //  Medicación para presión alta
    puntaje += Number(respuestas[5] || 0);
  
    // Nivel alto de glucosa
    puntaje += Number(respuestas[6] || 0);
  
    //  Familiares con diabetes
    puntaje += Number(respuestas[7] || 0);
  
    return puntaje;
  },  

  preguntas: [
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
        { texto: "Raramente o nunca", valor: 2, sexo: null },
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

