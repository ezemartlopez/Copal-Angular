export function esRequerido(valor: string): string {
    if (valor.trim() === '') {
      return 'El campo es requerido.';
    }
    return '';
  }
export function validarEmail(email: string): string{
    // Patrón simple para verificar una dirección de correo electrónico básica
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!patronEmail.test(email)) {
      return 'Ingrese una dirección de correo electrónico válida';
    }
  
    return ''; // La dirección de correo electrónico es válida
  }
export function validarFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split('-');
  const fechaSeleccionada = new Date(Number(anio), Number(mes) - 1, Number(dia));
  const fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0);
  if (fechaSeleccionada >= fechaHoy || fechaSeleccionada ===fechaHoy) {
    return '';
  }
  return 'La fecha debe ser mayor o igual que la fecha actual.';
}
// Función de validación para comprobar si la horaFin es mayor que la horaInicio y si ambas son horas válidas
export function invalidaHoraFin(horaInicio: string, horaFin: string): boolean {
  const horaInicioDate = new Date(`2000-01-01T${horaInicio}`);
  const horaFinDate = new Date(`2000-01-01T${horaFin}`);
  console.log('Hora Inicio:', horaInicioDate.toLocaleString());
  console.log('Hora fin: ', horaFinDate.toLocaleString());
  return horaFinDate <= horaInicioDate;
}

// Función para verificar si una cadena representa una hora válida
export function esHoraValida(hora: string): boolean {
  const patronHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return patronHora.test(hora);
}
// Función para verificar si una cadena representa una fecha válida
export function esFechaValida(fecha: string): boolean {
  const patronFecha = /^\d{4}-\d{2}-\d{2}$/;
  return patronFecha.test(fecha);
}


export function adecuarRespuesta(reserva: any){
  let reserva_modifcada = {
      "descripcion" : reserva.descripcion,
      "fecha" : reserva.fecha,
      "horaInicio" : reserva.horaInicio + ':00',
      "horaFin" : reserva.horaFin + ':00',
      "departamento" : Number(reserva.departamento),
      "responsable" : {
          "nombre" : reserva.nombre,
          "mail" : reserva.mail
      },
      "recursosSolicitados" : reserva.recursos,
      "espacioFisico" : Number(reserva.espacio)
  };
  return reserva_modifcada;
}