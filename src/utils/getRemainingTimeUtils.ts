import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// getRemainingTimeUtils.ts
export function getRemainingTime(fechaUltimaEncuesta: string) {
  const ahora = dayjs();
  const fechaEncuesta = dayjs(fechaUltimaEncuesta);
  const fechaDisponible = fechaEncuesta.add(6, 'month');
  const diffMs = fechaDisponible.diff(ahora);
  const completado = diffMs <= 0;
  const duracion = dayjs.duration(Math.max(diffMs, 0));

  const totalTiempo = fechaDisponible.diff(fechaEncuesta);
  const tiempoRestante = Math.max(diffMs, 0);
  const porcentajeCompletado = Math.min(1, (totalTiempo - tiempoRestante) / totalTiempo);

  return {
    meses: duracion.months(),
    dias: duracion.days(),
    horas: duracion.hours(),
    minutos: duracion.minutes(),
    segundos: duracion.seconds(),
    completado,
    porcentajeCompletado,
  };
}

