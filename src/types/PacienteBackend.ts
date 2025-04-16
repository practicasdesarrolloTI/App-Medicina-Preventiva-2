export type PacienteBackend = {
    tipo_documento: string | number;
    documento: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    fecha_nacimiento: string;
    sexo: string;
    celular: string;
    telefono: string;
    correo: string;
    codigo_ips: number;
    eps: string;
    tipo_documento_abreviado: string;
  };