import { Ubicacion } from './../ver-evento/ver-evento.component';
import { Formularios } from "src/app/departamento/formulario-departamento/formulario-departamento.component";

export function baseErrors(){
    return {
        flyer: '',
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        horaInicio:'',
        fechaFin: '',
        horaFin:'',
        urlInvitacion: '',
        departamento: '',
        tipoEvento: '',
        ubicacionProvincia: '',
        ubicacionLocalidad:'',
        ubicacionCalle:'',
        ubicacionAltura:'',
        urlEncuentro: '',
      };
}
function validarFechas(fechaInicioStr: string, fechaFinStr: string): boolean {
  const fechaInicio = new Date(fechaInicioStr);
  const fechaFin = new Date(fechaFinStr);

  if (!isNaN(fechaInicio.getTime()) && !isNaN(fechaFin.getTime())) {
    return fechaInicio <= fechaFin;
  }
  return false;
}
function validarHoras(fechaInicioStr: string, fechaFinStr: string, horaInicioStr: string, horaFinStr: string): boolean {
  const fechaInicio = fechaInicioStr ? new Date(`${fechaInicioStr}T${horaInicioStr}`) : null;
  const fechaFin = fechaFinStr ? new Date(`${fechaFinStr}T${horaFinStr}`) : null;

  if (fechaInicio && fechaFin) {
    return fechaInicio < fechaFin;
  } else if (!fechaInicio && !fechaFin) {
    return horaInicioStr < horaFinStr;
  }
  return false;
}
// Define una función para realizar validaciones
export function validarFormulario(formulario: any) {
    const errores = baseErrors();
    
    errores.nombre = !formulario.nombre ? 'El campo nombre es obligatorio': '';
    errores.descripcion = !formulario.descripcion? 'El campo descripcion es obligatorio': '';
    errores.fechaInicio = !formulario.fechaInicio? 'El campo fecha de inicio es obligatorio': validarFechas(formulario.fechaInicio, formulario.fechaFin)? '': 'La fecha de Inicio debe ser menor';
    errores.horaInicio = !formulario.horaInicio || formulario.horaInicio==='Ninguno'? 'El campo Hora de Inicio es obligatorio': validarHoras(formulario.fechaInicio, formulario.fechaFin, formulario.horaInicio, formulario.horaFin)? '': 'La hora de inicio debe ser menor';
    errores.fechaFin = !formulario.fechaFin ? 'El campo fecha de fin es obligatorio': validarFechas(formulario.fechaInicio, formulario.fechaFin)? '': 'La fecha de Fin debe ser mayor.';
    errores.horaFin = !formulario.horaFin || formulario.horaFin==='Ninguno'? 'El campo Hora de Finalizacion es obligatorio': validarHoras(formulario.fechaInicio, formulario.fechaFin, formulario.horaInicio, formulario.horaFin)? '': 'o La hora de fin debe ser mayor.';
  
/*     if (!formulario.urlInvitacion) {
      errores.urlInvitacion = 'El campo URL de invitación es obligatorio';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formulario.urlInvitacion)) {
      errores.urlInvitacion = 'El formato de la URL de invitación es incorrecto';
    }
   */
    errores.departamento = formulario.departamento === 0? 'Debe seleccionar una Organizacion': '';
    errores.tipoEvento = !formulario.tipoEvento || formulario.tipoEvento === 'Ninguno'? 'El campo tipo de evento es obligatorio':'';
  
  
    if (formulario.tipoEvento === 'PRESENCIAL' || formulario.tipoEvento === 'HIBRIDO') {
      errores.ubicacionProvincia = formulario.ubicacion.provincia==='0'?'El campo provincia es obligatorio':'';
      errores.ubicacionLocalidad = formulario.ubicacion.localidad ==='0'?'El campo localidad es obligatorio':'';
      errores.ubicacionCalle = !formulario.ubicacion.calle?'El campo calle es obligatorio':'';
      errores.ubicacionAltura = !formulario.ubicacion.altura?'El campo altura es obligatorio':'';
    }
    if(formulario.tipoEvento === 'VIRTUAL' || formulario.tipoEvento === 'HIBRIDO'){
        const regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        errores.urlEncuentro = !formulario.urlEncuentro ? "El campo de la URL del encuentro es obligatorio": '';
        //errores.urlEncuentro = !formulario.urlEncuentro ? "El campo de la URL del encuentro es obligatorio": regexURL.test(formulario.urlEncuentro)?'': 'El formato de la URL de encuentro es incorrecto';
    }

    return errores;
  }

export function tieneErrores(objeto: any) {
    for (const clave in objeto) {
      if (objeto.hasOwnProperty(clave) && objeto[clave] !== "") {
        return true;
      }
    }
    return false;
  }


function obtenerFecha(fecha: string){
    // Supongamos que tienes una fecha en cualquier formato
    const fechaOriginal = new Date(fecha);

    // Obtiene los componentes de la fecha
    const dia = fechaOriginal.getUTCDate();
    const mes = fechaOriginal.getMonth() + 1; // Mes se indexa desde 0, por lo que sumamos 1
    const anio = fechaOriginal.getFullYear();

    // Formatea la fecha en el formato "día/mes/año"
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    return fechaFormateada;

}
export function modificarFormulario(formulario: any){
    let cambioFormulario = {
        flyer:formulario.flyer,
        nombre:formulario.nombre,
        descripcion:formulario.descripcion,
        fechaInicio:formulario.fechaInicio + 'T' + formulario.horaInicio,
        fechaFin:formulario.fechaFin + 'T' + formulario.horaFin,
        urlInvitacion:formulario.urlInvitacion,
        departamento:parseInt(formulario.departamento),
        tipoDeEvento:formulario.tipoEvento,
        ubicacion:formulario.tipoEvento === 'PRESENCIAL' || formulario.tipoEvento==='HIBRIDO'?formulario.ubicacion: null,
        urlEncuentro:formulario.tipoEvento === 'VIRTUAL' || formulario.tipoEvento==='HIBRIDO'?formulario.urlEncuentro: null,
        estado:formulario.estado
      };
    return cambioFormulario;
}

export function copiarTextoAlPortapapeles(texto: string): boolean {
  try {
    // Crea un elemento de textarea temporal
    const elementoTemporal = document.createElement('textarea');
    elementoTemporal.value = texto;

    // Agrega el elemento al DOM para poder seleccionarlo
    document.body.appendChild(elementoTemporal);

    // Selecciona el texto en el elemento
    elementoTemporal.select();

    // Copia el texto al portapapeles utilizando el API de Clipboard
    document.execCommand('copy');

    // Elimina el elemento temporal del DOM
    document.body.removeChild(elementoTemporal);

    return true;
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    return false;
  }
}

// Ejemplo de uso
/*
const cadena = "algo";
const exito = copiarTextoAlPortapapeles(cadena);

if (exito) {
  console.log('Texto copiado al portapapeles con éxito.');
} else {
  console.log('No se pudo copiar al portapapeles.');
}
*/
